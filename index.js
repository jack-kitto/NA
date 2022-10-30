// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({

// Override the service name from package.json
// Allowed characters: a-z, A-Z, 0-9, -, _, and space
serviceName: 'NA',

// Use if APM Server requires a secret token
secretToken: 'vIElUgVeOk9vBHvxFq',

// Set the custom APM Server URL (default: http://localhost:8200)
serverUrl: 'https://821af7082a0548e3acdf8828ce11a771.apm.us-central1.gcp.cloud.es.io:443',

// Set the service environment
environment: 'production'
})

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
