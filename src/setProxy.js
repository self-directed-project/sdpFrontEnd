const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://sdp-ourmeeting.herokuapp.com/',
      changeOrigin: true
    })
  );
};
