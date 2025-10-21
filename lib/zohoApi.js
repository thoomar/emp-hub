const fetch = require('node-fetch');
const { getAccessToken } = require('./zohoAuth');

const CRM_BASE = process.env.ZOHO_CRM_BASE || 'https://www.zohoapis.com/crm/v2';

async function zfetch(path, opts = {}) {
    const access = await getAccessToken();
    const url = `${CRM_BASE}${path}`;
    const resp = await fetch(url, {
        ...opts,
        headers: {
            'Authorization': `Zoho-oauthtoken ${access}`,
            'Content-Type': 'application/json',
            ...(opts.headers || {}),
        },
    });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(`Zoho API ${resp.status} ${resp.statusText}: ${JSON.stringify(json)}`);
    return json;
}

// Example aggregations (simplistic; adjust to your fields & pagination needs)
function sumByOwner(records, field, ownerField = 'Owner') {
    const byOwner = new Map();
    for (const r of (records || [])) {
        const key = r[ownerField]?.id || 'unknown';
        const val = Number(r[field] || 0);
        byOwner.set(key, (byOwner.get(key) || 0) + val);
    }
    return Array.from(byOwner, ([ownerId, total]) => ({ ownerId, total }));
}

async function fetchDealsAmountByOwner() {
    // Adjust fields/stages as needed; this is a simple example
    const res = await zfetch('/Deals?fields=Owner,Amount,Stage&per_page=200');
    const rows = sumByOwner(res.data, 'Amount');
    return rows;
}

async function fetchDealsCountByOwner() {
    const res = await zfetch('/Deals?fields=Owner,Stage&per_page=200');
    const byOwner = new Map();
    for (const r of (res.data || [])) {
        const key = r.Owner?.id || 'unknown';
        byOwner.set(key, (byOwner.get(key) || 0) + 1);
    }
    return Array.from(byOwner, ([ownerId, total]) => ({ ownerId, total }));
}

async function fetchCallsDurationByOwner() {
    const res = await zfetch('/Calls?fields=Owner,Call_Duration&per_page=200');
    const rows = sumByOwner(res.data, 'Call_Duration');
    return rows;
}

module.exports = {
    fetchDealsAmountByOwner,
    fetchDealsCountByOwner,
    fetchCallsDurationByOwner,
};
