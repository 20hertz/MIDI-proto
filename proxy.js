// Proxy requests to local server to circumvent browsers' same-origin policy

const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const bundler = new Bundler('src/index.html');
const app = express();

const proxy = createProxyMiddleware({
  target: 'https://drive.google.com',
  changeOrigin: true,
  pathRewrite: { '^/google-drive': '' },
});

app.use('/google-drive', proxy);
app.use(bundler.middleware());
app.listen(1234);
