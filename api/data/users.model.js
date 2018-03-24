var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userName :{
        type: String,
        required : true,
        unique : true
    } ,
    password :{
        type: String,
        required : true
    },
    access : Number,
    wishList : [String],
    orderHistory : [String]
});
// compiling schema into model
mongoose.model('User',userSchema,'usersData');