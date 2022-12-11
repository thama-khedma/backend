Node-g.Raphaël 
--------------
For more information, see: http://g.raphaeljs.com/

Install:
--------
`$ npm install node-g.raphael`

Usage:
------
<pre>
var Raphael = require('node-g.raphael');
var jsdom = require('jsdom').jsdom;
var doc = jsdom('<html><head></head><body></body></html>');
var win = doc.createWindow();
Raphael.setWindow(win);

var paper = Raphael(0, 0, 300, 300);
paper.clear();

var lines = paper.linechart(0, 0, 300, 300, [1,2,3,4,5], [1,3,9,16,25], { colors: ['#F00'] });
var dots = paper.dotchart(0, 0, 300, 160, [1,2,3,4,5], [0,1,2,3,4], [4,3,2,4,6], { max: 5 });

var svg = doc.body.firstChild.outerHTML;
require('fs').writeFile('graph.svg', svg, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});

</pre>
