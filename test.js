'use strict'

const autocannon = require('autocannon')
let url = 'http://13.68.147.67/'

const instance = autocannon({
  url: url
}, console.log)

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
  instance.stop()
})

// just render results
autocannon.track(instance, {renderProgressBar: false})
// require('freeloader').global();
// require('freeloader-bundle').global();

// let url = 'http://13.68.147.67/'

// var r = request.get(url)
//                .header('Accept', 'application/json');

// emit(r)
// .pipe(responseDots())
// .pipe(perSecond(100))
// .pipe(stopTimer('600s'))
// .pipe(consoleSummary())
// .pipe(consoleCharts())
// .pipe(send())