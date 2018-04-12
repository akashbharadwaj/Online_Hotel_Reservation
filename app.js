//require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./api/routes');
var bcrypt = require('bcrypt'); 
var cors = require('cors');
var multer = require('multer');

// Define the port to run on
app.set('port', 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./api/controllers/passport.controllers.js')(passport);

//pass.pass;
var upload = multer({ dest: 'uploads' })

var uploadRoom = multer({ dest: 'uploadsRooms' })

app.post('/upload', upload.single('image'), function (req, res, next) {
  //console.log("upload");
  console.log(req.file);
      
  var resp = {filename: req.file.filename, message : "File uploaded successfully"};
          return res.send(resp);
    })

app.get ('/upload/:name',(req,res)=>{
    var dir = path.join(__dirname, 'uploads/'+req.params.name)
    console.log("here for image " + dir);
    res.sendFile(dir);
})

app.post('/upload/room', uploadRoom.single('image'), function (req, res, next) {
  //console.log("upload");
  console.log(req.file);
      
  var resp = {filename: req.file.filename, message : "File uploaded successfully"};
          return res.send(resp);
})

app.get ('/upload/room/:name',(req,res)=>{
  var dir = path.join(__dirname, 'uploadsRooms/'+req.params.name)
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
global.User_Name = "";
global.name = "";
console.log(User_Admin);
app.use('/api',routes);
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
