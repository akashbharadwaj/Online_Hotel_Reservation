
// var dbconn = require('../data/dbconnection.js')
// var hotelData = require('../data/hotel-data.json');
// var ObjectId = require('mongodb').ObjectID;

//Using Mongoose to route
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.body.lng);
    var lat = parseFloat(req.body.lat);

    //A geoJSON point

    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };
    /*
        Hotel
        .geoNear(point, geoOptions, function(err, results, stats){
            console.log('Geo results', results);
            console.log('geo stats',stats);
    
            res
            .status(200)
            .json(results);
    
    
        });
    */
    Hotel.geoNear(point, geoOptions, function (err, results, stats) {
        console.log('Geo results', results);
        console.log('geo stats', stats);

        res
            .status(200)
            .json(results);

    }

    )
};

module.exports.hotelsGetAll = function (req, res) {


    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    // console.log("db",db);
    //console.log("GET the hotels yo baby");


    var offset = 0;
    var count = 5;

    if (req.query && req.query.lng && req.query.lat) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, hotels) {
            //hotels is an array - to get how many of them using hotels.length
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);


        });


    // collection
    //     .find()
    //     .skip(offset)
    //     .limit(count)
    //     .toArray(function (err, docs) {
    //         //console.log("hotels found", docs);
    //         res
    //             .status(200)
    //             .json(docs);


    //     }

    //     );

    //to get the query strings from url

    //console.log(req.query);


    /*
        var returnData = hotelData.slice(offset, offset + count);
        res
            .status(200)
            .json(returnData);
            */
};

module.exports.hotelsGetOne = function (req, res) {

    //var db = dbconn.get();
    //var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET the hotelId", hotelId);
    //console.log(ObjectId(hotelId));
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc);
        });






    /*
        .findOne({
            _id: ObjectId(hotelId)
        }, function (err, doc) {
            res
                .status(200)
                .json(doc);
        }


        );
*/
};

module.exports.hotelsAddOne = function (req, res) {

    var db = dbconn.get();
    var collection = db.collection('hotelData');
    var newhotel;

    //console.log("db", db);
    console.log("POST new hotel");

    if (req.body && req.body.name && req.body.stars) {
        newhotel = req.body;
        newhotel.stars = parseInt(req.body.stars, 10);

        collection.insertOne(newhotel, function (err, response) {
            //console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        });
    } else {

        console.log("Data missing from body")
        res
            .status(400)
            .json({ message: "Required data missing from body" });
    }



};