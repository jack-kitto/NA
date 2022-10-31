const puppeteer = require('puppeteer');
const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv')


const myArgs = process.argv.slice(2);
let data = []
let url = 'http://13.68.147.67/'
let count = 0;
let interval;
let limit = 60
let c = myArgs[0];
let sample_rate = 4000;

const responseTime = async () => {
    response = await axios(url).catch(err => console.error(err))
    return await response.headers["x-response-time"].split("m")[0]
}

const loadSpeed = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  count++
  if(count >= limit){
    const csv = new ObjectsToCsv(data)
    csv.toDisk('./data/c' + c + '.csv').then(res => console.log(res)).catch(err => console.log(err))
    clearInterval(interval)
  } 

  // let's navigate to the dev.to homepage
  await page.goto(url).catch(err => console.error(err));

  // evaluate will run the function in the page context
  const perf = await page.evaluate(_ => {
    // let's get the latency-related performance information
    const { loadEventEnd, navigationStart } = performance.timing;

    // calculate the load time in milliseconds
    return { loadTime: loadEventEnd - navigationStart };
  }).catch(err => console.error(err));

  // and log the load time of the webpage
  console.log(perf.loadTime);
  let response = await axios(url + "usage").catch(err => console.error(err))
  
  data.push({
    ts: Math.floor(new Date().getTime()/1000.0),
    pl: perf.loadTime,
    rt: await responseTime(),
    cpu: await response.data.cpu,
    freemem: await response.data.free_mem
})

  // we're done; close the browser
  await browser.close();
};


interval = setInterval(loadSpeed, sample_rate)