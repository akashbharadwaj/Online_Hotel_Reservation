//require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
var bcrypt = require('bcrypt'); 
// Define the port to run on
app.set('port', 3000);
//app.engine('ejs',require('ejs').renderFile);
app.set("view engine","ejs");
console.log(__dirname);
app.set('views',path.join(__dirname+'/api/views/'));
// Set static directory before defining routes
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());
// Add some routing
app.use('/api',routes);
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
