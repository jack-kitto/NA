const puppeteer = require('puppeteer');
const ObjectsToCsv = require('objects-to-csv')


let data = []
let url = 'http://13.68.147.67/'
let count = 0;
let interval;
let limit = 600


const loadSpeed = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  count++
  if(count > limit){
    const csv = new ObjectsToCsv(data)
    console.table(data)
    csv.toDisk('./data.csv').then(res => console.log(res)).catch(err => console.log(err))
    clearInterval(interval)
  } 

  // let's navigate to the dev.to homepage
  await page.goto(url);

  // evaluate will run the function in the page context
  const perf = await page.evaluate(_ => {
    // let's get the latency-related performance information
    const { loadEventEnd, navigationStart } = performance.timing;

    // calculate the load time in milliseconds
    return { loadTime: loadEventEnd - navigationStart };
  }).catch(err => console.error(err));

  // and log the load time of the webpage
  console.log(perf.loadTime);
  data.push({
    "time (s)": Math.floor(new Date().getTime()/1000.0),
    "Page Load (s)": perf.loadTime
})

  // we're done; close the browser
  await browser.close();
};


interval = setInterval(loadSpeed, 1000)