// /api/verify-payment (callback/webhook)
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://vpn-private.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // В реальной интеграции: проверить подпись FreedomPay
    // Макет: всегда успех.
    return res.status(200).json({ ok: true });
}