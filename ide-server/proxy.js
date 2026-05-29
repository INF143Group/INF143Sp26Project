import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin: true,
    proxyTimeout: 10000,
    timeout: 10000,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));