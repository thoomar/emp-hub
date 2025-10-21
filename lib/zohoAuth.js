const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // v2.x required when using CommonJS require()

const ACCOUNTS_BASE = process.env.ZOHO_ACCOUNTS_BASE || 'https://accounts.zoho.com';
const CLIENT_ID     = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const REDIRECT_URI  = process.env.ZOHO_REDIRECT_URI || 'http://localhost:3000/oauth/callback';
const SCOPES        = process.env.ZOHO_SCOPES || 'ZohoCRM.users.READ,ZohoCRM.modules.all';

const TOKENS_DIR = path.resolve(__dirname, '../../tokens');
const TOKENS_FILE = path.join(TOKENS_DIR, 'zoho.json');

function ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function loadRefreshToken() {
    try {
        const raw = fs.readFileSync(TOKENS_FILE, 'utf8');
        const json = JSON.parse(raw);
        return json.refresh_token || null;
    } catch {
        return process.env.ZOHO_REFRESH_TOKEN || null;
    }
}

async function saveRefreshToken(refreshToken) {
    ensureDir(TOKENS_DIR);
    fs.writeFileSync(TOKENS_FILE, JSON.stringify({ refresh_token: refreshToken }, null, 2));
    console.log(`Saved refresh token to ${TOKENS_FILE}`);
}

function buildAuthUrl() {
    const params = new URLSearchParams({
        response_type: 'code',
        access_type: 'offline',         // REQUIRED for refresh_token
        prompt: 'consent',              // Force a refresh token each time
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI
    });
    return `${ACCOUNTS_BASE}/oauth/v2/auth?${params.toString()}`;
}

let cached = { token: null, exp: 0 };

async function getAccessToken() {
    const now = Date.now();
    if (cached.token && now < cached.exp - 60_000) return cached.token;

    const refreshToken = loadRefreshToken();
    if (!refreshToken) {
        throw new Error('Missing refresh token. Visit /oauth/start and finish the flow first.');
    }

    const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    const url = `${ACCOUNTS_BASE}/oauth/v2/token`;
    const resp = await fetch(url, { method: 'POST', body: params });
    const json = await resp.json();
    if (!resp.ok) {
        throw new Error(`Refresh failed: ${resp.status} ${resp.statusText} - ${JSON.stringify(json)}`);
    }
    if (!json.access_token) {
        throw new Error(`No access_token in response: ${JSON.stringify(json)}`);
    }
    const expiresIn = Number(json.expires_in || 3600) * 1000;
    cached.token = json.access_token;
    cached.exp = now + expiresIn;
    return cached.token;
}

async function exchangeCodeForTokens(code) {
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code
    });
    const url = `${ACCOUNTS_BASE}/oauth/v2/token`;
    const resp = await fetch(url, { method: 'POST', body: params });
    const json = await resp.json();
    if (!resp.ok) {
        throw new Error(`Code exchange failed: ${resp.status} ${resp.statusText} - ${JSON.stringify(json)}`);
    }
    // Persist refresh token if present
    if (json.refresh_token) {
        await saveRefreshToken(json.refresh_token);
    }
    return json;
}

module.exports = {
    buildAuthUrl,
    getAccessToken,
    exchangeCodeForTokens,
    saveRefreshToken,
};
