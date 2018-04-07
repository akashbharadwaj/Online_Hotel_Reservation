//require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
var bcrypt = require('bcrypt'); 
var cors = require('cors');
var multer = require('multer');

// Define the port to run on
app.set('port', 3000);
app.use(cors());
app.use(bodyParser.json());

var upload = multer({ dest: 'uploads' })

app.post('/upload', upload.single('image'), function (req, res, next) {
  //console.log("upload");
  console.log(req.file);
      
  var resp = {filename: req.file.filename, message : "File uploaded successfully"};
          return res.send(resp);
    })

app.get ('/upload/:name',(req,res)=>{
    var dir = path.join(__dirname, 'public/uploads/'+req.params.name)
    console.log("here for image " + dir);
    res.sendFile(dir);
})
//app.engine('ejs',require('ejs').renderFile);
//app.set("view engine","ejs");
//console.log(__dirname);
//app.set('views',path.join(__dirname+'/api/views/'));
// Set static directory before defining routes
app.use(express.static(path.join(__dirname, '/public')));


//app.use(bodyParser.urlencoded({extended : false}));
//app.use(bodyParser.json());
// Add some routing
global.User_Admin = false;
global.User_Name;
console.log(User_Admin);
app.use('/api',routes);
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
