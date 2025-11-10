// /api/get-config -- выдает WireGuard конфиг
function generateWireGuardConfig(orderId) {
    // В проде: тут вы бы обращались к базе
    // Пока -- тестовый конфиг-шаблон с заглушкой
    return `[Interface]
PrivateKey = <YOUR_CLIENT_PRIVATE_KEY>
Address = 10.66.66.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = <YOUR_SERVER_PUBLIC_KEY>
PresharedKey = <OPTIONAL_IF_USED>
Endpoint = YOUR_SERVER_IP:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
# orderId=${orderId}
`;
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://vpn-private.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { orderId } = req.query || {};
    if (!orderId) {
        return res.status(400).json({ error: 'orderId required' });
    }

    // В проде: проверить в БД, что заказ оплачен
    // Макет: отдаем конфиг всегда.
    const configText = generateWireGuardConfig(orderId);
    return res.status(200).json({ configText });
}