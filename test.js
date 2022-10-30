require('freeloader').global();
require('freeloader-bundle').global();

var r = request.get('http://localhost:3000/')
               .header('Accept', 'application/json');

emit(r)
.pipe(concurrent(50))
.pipe(stopTimer('30s'))
.pipe(consoleSummary())
.pipe(consoleCharts())
.pipe(send())