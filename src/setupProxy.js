const { createProxyMiddleware } = require("http-proxy-middleware")

// const upstream = "http://127.0.0.1:8000"
const upstream = "http://127.0.0.1:5500"

module.exports = function(app) {
  app.use("/resources", createProxyMiddleware({
    target: upstream
  }))
}
