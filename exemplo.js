
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

app.get('/afazeres', function (req, res, next) {
  res.json([{afazer: 'Lavar o carro!'}])
})

app.listen(80, function () {
  console.log('http://127.0.0.1:80/afazeres')
})
