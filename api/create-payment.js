// /api/create-payment (Vercel serverless)
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://vpn-private.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { plan } = req.body || {};
    if (!plan || !['monthly','quarterly'].includes(plan)) {
        return res.status(400).json({ error: 'Invalid plan' });
    }

    // FreedomPay: здесь нужно создать платеж
    // Ниже MAKET для тестов, без реального API
    const orderId = 'test_' + Math.random().toString(36).substr(2, 9);
    const backendBase = process.env.PUBLIC_BACKEND_URL || '';
    const netlifySuccess = process.env.PUBLIC_SUCCESS_URL || 'https://vpn-private.netlify.app/success.html';
    
    // Идея: пользователь платит на стороне FreedomPay
    // В тестовом режиме сразу отправим на success URL
    const redirectUrl = `${netlifySuccess}?orderId=${orderId}`;

    return res.status(200).json({ orderId, redirectUrl, success: true });
}
  