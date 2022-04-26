const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(express.static('./dist'))
app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagounews.com',
  changeOrigin: true
}))
app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagounews.com',
  changeOrigin: true
}))

app.listen(80, () => {
  console.log('server is running on 80 and serve ./dist')
})
