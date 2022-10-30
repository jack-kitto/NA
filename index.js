var express = require('express')
var morgan = require('morgan')
var port = 3000

var app = express()

app.use(morgan('tiny'))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
