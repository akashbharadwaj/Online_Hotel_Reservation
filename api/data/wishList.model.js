var mongoose = require('mongoose');

var wishListSchema = new mongoose.Schema({
    
    userId : {
        type : String,
        required : true
    },
    hotelName: [String],
    
    
});

// compiling schema into model
mongoose.model('wishList',wishListSchema,'wishListData');