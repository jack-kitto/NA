'use strict'

const autocannon = require('autocannon')
let url = 'http://13.68.147.67/'
const myArgs = process.argv.slice(2);
let duration = 50
let connections = myArgs[0]

autocannon({
  url: url,
  connections: connections, //default
  pipelining: 1, // default
  duration: duration // default
}, console.log)