const csv = require('csv-parser')
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')
const results = [];
const myArgs = process.argv.slice(2);

function getAvgs(c, d){
  let avgCpu = 0;
  let avgFreeMem = 0;
  let avgPl = 0;
  let avgRt = 0;
  let totalCpu = 0;
  let totalFreemem = 0;
  let totalPl = 0;
  let totalRt = 0;
  d.map(sample => {
    totalCpu += parseFloat(sample.cpu)
    totalFreemem += parseFloat(sample.freemem)
    totalPl += parseFloat(sample.pl)
    totalRt += parseFloat(sample.rt)
  })
  avgCpu = totalCpu/d.length
  avgFreeMem = totalFreemem/d.length
  avgPl = totalPl/d.length
  avgRt = totalRt/d.length
  return [{
    c: c,
    cpu: avgCpu,
    freemem: avgFreeMem,
    pl: avgPl,
    rt: avgRt
  }]
}


async function start(c){
    let d = await getData(c)
    console.log(d)
    d.on('end', () => {
        const csv = new ObjectsToCsv(getAvgs(c, results))
        csv.toDisk('./clean.csv', { append: true }).then(res => console.log(res)).catch(err => console.log(err))
    });
}

async function getData(c){
    return fs.createReadStream('data/c' + c + '.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
}

start(myArgs[0])