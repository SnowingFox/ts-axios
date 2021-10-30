const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const complier = webpack(webpackConfig)

app.use(
  webpackDevMiddleware(complier, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(complier))

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', '1234abc')
    }
  })
)

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

app.use(router)

router.get('/simple/get', (req, res) => {
  res.json(req.body)
})

router.post('/simple/post', (req, res) => {
  res.jsonp({ a: JSON.stringify(req.body) })
})

const port = 8082

module.exports = app.listen(port, () => {
  console.log(
    `Server listening on http://localhost:${port},you can enter Ctrl+C to stop it`
  )
})
