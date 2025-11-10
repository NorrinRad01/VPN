// /api/create-payment (Vercel serverless)
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { plan } = req.body || {};
    if (!plan || !['monthly', 'quarterly'].includes(plan)) {
        return res.status(400).json({ error: 'Invalid plan' });
    }

    const orderId = 'test_' + Math.random().toString(36).substr(2, 9);
    const netlifySuccess = process.env.PUBLIC_SUCCESS_URL || '';
    const redirectUrl = `${netlifySuccess}?orderId=${orderId}`;

    return res.status(200).json({ orderId, redirectUrl, success: true });
}
  