var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/Hotels';

//connection to data base
mongoose.connect(dburl);
secret = 'yourSecret';
mongoose.connection.on('connnected',function(){
    console.log('mongoose connected to '+dburl);
});

mongoose.connection.on('disconnnected',function(){
    console.log('mongoose disconnected');
});

mongoose.connection.on('error',function(err){
    console.log('mongoose connection error '+err);
});

//Bring in schema and models
require('./hotels.model.js');
require('./users.model.js');
require('./bookings.model.js');
require('./wishList.model.js');