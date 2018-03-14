var mongoose = require('mongoose');

//nested schemas

var reviewsSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    rating :{
        type : Number,
        min : 0,
        max : 5,
        required : true
    },
    review :{
        type : String,
        required : true

    },
    createdOn :{
        type : Date,
        "default": Date.now
    }



});

var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number


});
var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    stars : {
        type: Number,
        min: 0,
        max: 5,
        "default": 0


    },
    description : String,
    services : [String],
    photos : [String],
    currency : String,
    reviews : [reviewsSchema],
    rooms : [roomSchema],
    location : {
        address : String,
        //Always store latitutude(N/S) and longititude (E/W)
        coordinates : {
            type: [Number],
            index : '2dsphere'
    }
},



});
// compiling schema into model
mongoose.model('Hotel',hotelSchema,'hotelsData');