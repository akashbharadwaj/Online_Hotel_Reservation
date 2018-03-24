var mongoose = require('mongoose');

//autoIncrement.initialize(connection);
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
var wishListSchema = new mongoose.Schema({
    
    userId : {
        type: Schema.Types.ObjectId, ref: 'User',
        type : String,
        required : true
    },
    hotelId : [{
        type: Schema.Types.ObjectId, ref: 'Hotel',
        type : String,
        required : true
    }],
    
    
});

// compiling schema into model
mongoose.model('wishList',wishListSchema,'wishList');