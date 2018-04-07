var mongoose = require('mongoose');

//nested schemas
/*
var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number


});
*/
var hotelSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true,
        unique : true
    },
   // name : String,
    location : String,
    locationCode : String,
    rating : Number,
    description : String,
    services : [String],
    photos : [String],
    rooms : [
        {
            roomType : String,
            number : Number,
            description : String,
            photos : [String],
            price : Number,
            flagDeletedRooms : Boolean
        }
    ],
    flagDeleted : Boolean
    
});
// compiling schema into model
mongoose.model('Hotel',hotelSchema,'hotelsData');