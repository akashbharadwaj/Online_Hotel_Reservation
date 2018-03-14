var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
mongoose.model('User',userSchema,'usersData');