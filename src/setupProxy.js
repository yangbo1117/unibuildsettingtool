// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = (app)=>{
    app.use('/connect',createProxyMiddleware({
        target:"http://172.16.10.208:5200",
        changeOrigin:true
    }));
};
