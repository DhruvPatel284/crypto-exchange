const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


// Target server URL
const targetUrl = 'https://api.backpack.exchange';

// Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
    next();
});

app.use('/', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'api.backpack.exchange');
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
        proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress || req.ip); // Client IP
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error', details: err.message });
    }
}));

const port = 3001;
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
