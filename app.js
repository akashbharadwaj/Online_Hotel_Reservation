//require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
// Define the port to run on
app.set('port', 3000);

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended : false}));
// Add some routing
app.use('/api',routes);
//ggt
/*
app.get('/json', function(req, res) {
  console.log("GET the jsons");
  res
    .status(200)
    .json( {"jsonData" : true} );
});

app.get('/file', function(req, res) {
  console.log("GET the file");
  res
    .status(200)
    .sendFile(path.join(__dirname, 'app.js'));
});

*/
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
