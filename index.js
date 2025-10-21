// index.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

/* --------------------------
   1) Load .env robustly
--------------------------- */
const envCandidates = [
    path.resolve(__dirname, '.env'),            // same folder as index.js  (recommended)
    path.resolve(process.cwd(), '.env'),        // current working dir (fallback)
    path.resolve(__dirname, 'emp-hub/.env'),    // legacy nested path (if you had one)
];

let envLoaded = null;
for (const p of envCandidates) {
    if (fs.existsSync(p)) {
        envLoaded = require('dotenv').config({ path: p });
        const count = envLoaded.parsed ? Object.keys(envLoaded.parsed).length : 0;
        console.log(`[env] Loaded ${count} key(s) from: ${p}`);
        break;
    }
}
if (!envLoaded) {
    console.warn('[env] No .env file found. Looked in:\n' + envCandidates.join('\n'));
}

/* --------------------------
   2) Core server setup
--------------------------- */
const app = express();
const PORT = process.env.PORT || 3000;

// CORS: allow local Vite dev by default; add domains via CORS_ORIGIN (comma-separated)
const defaultAllowed = [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://portal.timesharehelpcenter.com',
    'https://timeoff.timesharehelpcenter.com',
    'https://lst.timesharehelpcenter.com'
];
const envAllowed = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, cb) => {
        if (!origin) return cb(null, true); // curl/Postman/server-to-server
        if (defaultAllowed.includes(origin) || envAllowed.includes(origin)) return cb(null, true);
        return cb(new Error(`CORS not allowed: ${origin}`), false);
    },
    credentials: true,
}));

app.use(express.json());

/* --------------------------
   3) Health & config
--------------------------- */
app.get('/api/ping', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.get('/api/config', (req, res) => {
    res.json({
        stageField: process.env.STAGE_FIELD,
        wonStages: process.env.WON_STAGES,
        dateField: process.env.DATE_FIELD,
        accountsBase: process.env.ZOHO_ACCOUNTS_BASE || 'https://accounts.zoho.com',
        redirectUri: process.env.ZOHO_REDIRECT_URI || 'http://localhost:3000/oauth/callback',
        scopes: process.env.ZOHO_SCOPES || 'ZohoCRM.modules.deals.READ,ZohoCRM.users.READ',
        hasClientId: Boolean(process.env.ZOHO_CLIENT_ID),
        hasClientSecret: Boolean(process.env.ZOHO_CLIENT_SECRET),
        hasRefreshToken: Boolean(process.env.ZOHO_REFRESH_TOKEN),
    });
});

/* --------------------------
   4) Zoho OAuth helpers
--------------------------- */
// Node 18+ has global fetch (Node 22 in your logs), so no import needed.
const ACCOUNTS = process.env.ZOHO_ACCOUNTS_BASE || 'https://accounts.zoho.com';
const REDIRECT_URI = process.env.ZOHO_REDIRECT_URI || 'http://localhost:3000/oauth/callback';
const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
// Minimal scopes for leaderboard: read deals + users (tighten later if needed)
const SCOPES = process.env.ZOHO_SCOPES || 'ZohoCRM.modules.deals.READ,ZohoCRM.users.READ';

// ✅ Fixed require paths here
const zohoAuth = require('./lib/zohoAuth');
const zohoApi  = require('./lib/zohoApi');

// Kick off OAuth — visit this in the browser
app.get('/oauth/start', (req, res) => {
    if (!CLIENT_ID) return res.status(500).send('Missing ZOHO_CLIENT_ID in .env');
    const authURL = new URL('/oauth/v2/auth', ACCOUNTS);
    authURL.searchParams.set('response_type', 'code');
    authURL.searchParams.set('client_id', CLIENT_ID);
    authURL.searchParams.set('redirect_uri', REDIRECT_URI);
    authURL.searchParams.set('scope', SCOPES);
    authURL.searchParams.set('access_type', 'offline'); // issue refresh_token
    authURL.searchParams.set('prompt', 'consent');      // force a new refresh_token if needed
    res.redirect(authURL.toString());
});

// OAuth callback — exchanges ?code for tokens and shows your refresh_token
app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('Missing ?code');
    if (!CLIENT_ID || !CLIENT_SECRET) return res.status(500).send('Missing client id/secret in .env');

    try {
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            code,
        });

        const r = await fetch(`${ACCOUNTS}/oauth/v2/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });
        const json = await r.json();

        console.log('Zoho token response:', json);

        if (json.error) {
            return res.status(400).send(`Token exchange failed: ${json.error_description || json.error}`);
        }

        const refresh = json.refresh_token;
        const access = json.access_token;
        const apiDomain = json.api_domain;

        res.send(`
      <h2>Zoho OAuth Complete</h2>
      <p><strong>Refresh Token:</strong></p>
      <pre>${refresh || '(none — try consenting again; do not reuse old codes)'}</pre>
      <p><strong>Access Token (temporary):</strong></p>
      <pre>${access || '(none)'}</pre>
      <p><strong>API Domain:</strong></p>
      <pre>${apiDomain || '(unknown)'}</pre>
      <p>Copy the refresh token into your <code>.env</code> as <code>ZOHO_REFRESH_TOKEN</code> and restart the server.</p>
    `);
    } catch (e) {
        console.error(e);
        res.status(500).send('Unexpected error during token exchange.');
    }
});

// Quick test — use refresh token to mint an access token
app.get('/api/zoho-test', async (req, res) => {
    try {
        if (!process.env.ZOHO_REFRESH_TOKEN) {
            return res.status(400).json({ error: 'missing_refresh_token' });
        }
        if (!CLIENT_ID || !CLIENT_SECRET) {
            return res.status(500).json({ error: 'missing_client_config' });
        }

        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        });

        const r = await fetch(`${ACCOUNTS}/oauth/v2/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });
        const json = await r.json();
        res.json(json);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'refresh_failed' });
    }
});

/* --------------------------
   5) Mock leaderboard (replace later with real Zoho query)
--------------------------- */
app.get('/api/leaderboard', async (req, res) => {
    const { metric = 'revenue', period = 'this_month' } = req.query;
    const data = [
        { userId: 'u1', name: 'Alex',  score: metric === 'revenue' ? 120000 : 42 },
        { userId: 'u2', name: 'Riley', score: metric === 'revenue' ?  98000 : 33 },
        { userId: 'u3', name: 'Sam',   score: metric === 'revenue' ?  76000 : 28 },
    ];
    res.json({ metric, period, data });
});

/* --------------------------
   6) Serve Vite build (Option A)
   - Build your frontend in my-app:  npm run build
   - This will serve my-app/dist and SPA routes
--------------------------- */
const distDir = path.join(__dirname, 'my-app', 'dist');

if (fs.existsSync(distDir)) {
    // Serve static assets from Vite build
    app.use(express.static(distDir));

    // SPA fallback: allow React Router routes to work on refresh
    app.get('*', (req, res, next) => {
        const isApi = req.path.startsWith('/api/');
        const isOAuth = req.path.startsWith('/oauth/');
        if (isApi || isOAuth) return next(); // keep API/OAuth handled above
        res.sendFile(path.join(distDir, 'index.html'));
    });
} else {
    console.warn(`[vite] No build found at ${distDir}. Run "npm run build" in my-app.`);
}

/* --------------------------
   7) Start server
--------------------------- */
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
