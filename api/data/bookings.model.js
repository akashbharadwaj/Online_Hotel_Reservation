var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/Hotels");

autoIncrement.initialize(connection);

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
var bookingSchema = new mongoose.Schema({
    
    bookingId : {
        type : Number,
        unique : true,
        required : true
    },
    hotelId : {
        type: Schema.Types.ObjectId, ref: 'Hotel',
        type: String,
        required : true
    },
    roomId : {
        type: Schema.Types.ObjectId, ref: 'Hotel.rooms',
        type: String,
        required : true
    },
    userId : {
        type: Schema.Types.ObjectId, ref: 'User',
        type : String,
        required : true
    },

    numberOfRoomsBooked : Number,
    startDate : Date,
    endDate : Date
    
    
});
bookingSchema.plugin(autoIncrement.plugin, {
    model: 'Booking',
    field: 'bookingId',
    startAt: 1,
    incrementBy: 1
});
//bookingSchema.plugin(autoIncrement.plugin, 'Booking');
// compiling schema into model
mongoose.model('Booking',bookingSchema,'bookingsData');
//connection.model('Booking', bookingSchema,'bookingsData');