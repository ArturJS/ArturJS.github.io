const http = require('http');
const httpProxy = require('http-proxy');

require('dotenv-safe').config({
    example: './.env.example',
    path: './.env'
});

const {
    HOST,
    PORT,
    API_HOST,
    API_PORT,
    UI_HOST,
    UI_PORT
} = process.env;
const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;
const UI_BASE_URL = `http://${UI_HOST}:${UI_PORT}`;

const getTargetUrl = (url) => {
    const isApiPath = /^\/api\//.test(url);

    if (isApiPath) {
        return API_BASE_URL;
    }

    return UI_BASE_URL;
};

const proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

// added the error handling
// to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
    let json;

    if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error);
    }

    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }

    json = {error: 'proxy_error', reason: error.message};
    res.end(JSON.stringify(json));
});

const server = http.createServer((req, res) => {
    proxy.web(req, res, {
        target: getTargetUrl(req.url)
    });
});

server.listen(PORT, () => {
    console.log(`API Gateway has started at http://${HOST}:${PORT}`);
});
