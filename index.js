var express = require('express')
var morgan = require('morgan')
var port = 80

var app = express()
let responseTime
app.use(morgan('tiny'))
app.use(express.static('public'))
const getDurationInMilliseconds  = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} [STARTED]`)
    const start = process.hrtime()
    res.on('finish', () => {            
        responseTime = getDurationInMilliseconds (start)
        console.log(`${req.method} ${req.originalUrl} [FINISHED] ${responseTime.toLocaleString()} ms`)
    })
    next()
})

app.get('/', function (req, res) {
  res.send(responseTime)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
