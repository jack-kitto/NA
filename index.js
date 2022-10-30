var express = require('express')
var morgan = require('morgan')
var responseTime = require('response-time')
var os_utils 	= require('os-utils');
var StatsD = require('node-statsd')
var port = 80
var app = express()
var stats = new StatsD()
var os = require('os');

app.use(morgan('tiny'))
app.use(responseTime())

stats.socket.on('error', function (error) {
  console.error(error.stack)
})

app.use(responseTime(function (req, res, time) {
  var stat = (req.method + req.url).toLowerCase()
    .replace(/[:.]/g, '')
    .replace(/\//g, '_')
  stats.timing(stat, time)
}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
app.get('/usage', function (req, res) {
    os_utils.cpuUsage(function(v){
        res.json({
            "cpu": v,
            "free_mem": os.freemem()
        })
    });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
