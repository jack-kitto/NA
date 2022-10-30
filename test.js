require('freeloader').global();
require('freeloader-bundle').global();
const puppeteer = require('puppeteer');

let url = 'http://13.68.147.67/'

var r = request.get(url)
               .header('Accept', 'application/json');

emit(r)
.pipe(times(50))
.pipe(jsonSummary('./report.json'))
.pipe(consoleSummary())
.pipe(consoleCharts())
.pipe(send())

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // let's navigate to the dev.to homepage
//   await page.goto('https://dev.to');

//   // evaluate will run the function in the page context
//   const perf = await page.evaluate(_ => {
//     // let's get the latency-related performance information
//     const { loadEventEnd, navigationStart } = performance.timing;

//     // calculate the load time in milliseconds
//     return { loadTime: loadEventEnd - navigationStart };
//   });

//   // and log the load time of the webpage
//   console.log(perf.loadTime);

//   // we're done; close the browser
//   await browser.close();
// })();