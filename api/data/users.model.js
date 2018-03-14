var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userName : String,
    password : String,
    access : Number,
    wishList : [String],
    orderHistory : [String]
});
// compiling schema into model
mongoose.model('User',userSchema,'usersData');