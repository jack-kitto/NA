var express = require('express')
var morgan = require('morgan')
var port = 80

var app = express()

app.use(morgan('tiny'))
app.use(express.static('public'))


app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
