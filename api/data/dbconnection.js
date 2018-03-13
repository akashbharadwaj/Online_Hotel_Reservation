//mongo driver

var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/MEANHOTEL';

var _connection = null;

// to open the connection

var open = function(){
    //set connection
    MongoClient.connect(dburl, function(err, db){
        if(err){

            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB Connection open",db);

    });

};

var get = function(){

    return _connection;

};

module.exports = {
    open: open,
    get: get

};