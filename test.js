require('freeloader').global();
require('freeloader-bundle').global();

var r = request.get('http://13.68.147.67/')
               .header('Accept', 'application/json');

emit(r)
.pipe(concurrent(50))
.pipe(stopTimer('60s'))
.pipe(consoleSummary())
.pipe(consoleCharts())
.pipe(send())