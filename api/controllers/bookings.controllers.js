var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');
var Hotel = mongoose.model('Hotel');
var User = mongoose.model('User');
var dateUtil = require('date-util');

var startDate;
var endDate;
var availability;
var hotelID;
var roomID;
var bookingId;
var hotelName;
var location;
var roomType;
var startDateDB;
var endDateDB;
var flagBookingCancelled = false;
var price;

module.exports.checkAvailability = function (req, res) {
    console.log("Availability");
    startDate = req.body.startDate;
    endDate = req.body.endDate;
    hotelID = req.body.hotelID;
    roomID = req.body.roomID;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var numberOfRooms;
    console.log("hotelID: "+ hotelID);
    var today = new Date();
    console.log(today);

    today = new Date(today);

    if(startDate > today && startDate<=endDate)
    {

        Hotel.findOne({ "_id": hotelID },function (err, hotel) {
        //hotelId = hotel._id;
        hotelName = hotel.name;
        location = hotel.location;
        for (var i = 0; i < hotel.rooms.length; i++) {
           // console.log(hotel.rooms[i].roomType);
            if (hotel.rooms[i]._id == roomID) {

                var j = i;
                //roomId = hotel.rooms[j]._id;
                roomType = hotel.rooms[j].roomType;
                numberOfRooms = hotel.rooms[j].number;
                price = hotel.rooms[j].price;
                console.log(numberOfRooms);
                
                Booking.find({ "hotelId": hotelID, "roomId": roomID, "flagBookingCancelled": false }, function (err, booking) {
                    console.log("booking inside");
                    booking.forEach(element => {
                        //console.log("db:"+element.startDate);
                        //console.log("User:"+startDate);
                        startDateDB = new Date(element.startDat)
                        endDateDB = new Date(element.endDate);
                        if ((startDateDB <= startDate) || (startDate <= endDateDB)) {
                            console.log("less equal");
                            console.log(element.numberOfRoomsBooked);
                            numberOfRooms = numberOfRooms - element.numberOfRoomsBooked;
                            console.log("number of rooms: "+ numberOfRooms);
                        }
                        else if ((startDateDB <= endDate) || (endDate <= endDateDB)) {
                            numberOfRooms = numberOfRooms - element.numberOfRoomsBooked;

                        }
                    });
                    availability = numberOfRooms;
                    console.log("availability:"+availability+" number avil: "+numberOfRooms);
                    if(numberOfRooms < 0)
                    {
                        availability = 0;
                        res.json({num: availability});
                    }
                    else
                    {
                        
                        res.json({num: availability});
                    }
                    //res1.json({numb: numberOfRooms});
                    console.log("y not coming here3");
                    
                    //response - send availability of the rooms
                });
                console.log("Outside: "+numberOfRooms);
                console.log("y not coming here1");
            }
        }

    });
    console.log("y not coming here2");
}
else {
    res.json({num: 0});
}
}

module.exports.checkOut = function (req, res) {

    var numberOfRooms = req.body.quantity;
    var User_Name = req.body.userName;
    price = price * numberOfRooms;
    console.log("User ID: "+ User_Name) ;
    if (availability >= numberOfRooms) {

        var bookingData = {
            "hotelId": hotelID,
            "roomId": roomID,
            "userId": User_Name,
            "numberOfRoomsBooked": numberOfRooms,
            "startDate": startDate,
            "endDate": endDate,
            "hotelName": hotelName,
            "location": location,
            "roomType": roomType,
            "flagBookingCancelled": flagBookingCancelled,
            "price": price
        };
        var newBooking = new Booking(bookingData);
        newBooking.save(function (err, cb) {
            if (err) {
                console.log("error");
                console.log(err);
                //res.render("homepage");
                res.json("error");
            }
            else {
                console.log("Why");
                console.log("success");
                // res.render("homepage");
                //res.send("sucess");

                bookingId = cb.bookingId;
                console.log(bookingId);
                console.log(User_Name);
                User.findOne({ 'userName': User_Name },function (err, user) {
                    console.log(user);
                    try {
                        user.orderHistory.push(bookingId);
                    }
                    catch (e) {
                        console.log("Exception:" + e);
                        res.json({msg: true});
                    }
                    
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json({msg: true});
                        }

                        console.log("success");
                        //res.json({msg: false});

                    });
                });
                
                res.json({checkout: true});
            }
        });
    }
    else {
        //send a message saying selected number is greater than available
    }
}


module.exports.listHotelBookings = function(req,res){

    console.log("Booking history");
    var searchTerm = req.query.name;
    console.log(searchTerm);
    
    if(searchTerm==undefined)
    {
        Booking.find({'flagBookingCancelled': false},function(err,book){
            res.json({booking: book});
        });
    }
    else
    {
    Booking.find({$and : [{$or:[{'hotelName': { "$regex": searchTerm, "$options": "i" } }, {'userId' : { "$regex": searchTerm, "$options": "i" }}]},{'flagBookingCancelled': false}]}, function(err,book){
        console.log(book);
        res.json({booking: book});
    });
    }   
}


module.exports.cancelBooking = function(req,res) {
    console.log("inside cancel booking");
    var bookingId = req.params.id;

    Booking.findOne({'bookingId': bookingId},function(err,book){

        if(err)
        {
            console.log(err);
        }
        else{
            book.flagBookingCancelled = true;

            book.save();
            res.json({msg: true});
        }

    });
}


module.exports.retrieveOrderHistory = function (req, res) {
    console.log("Booking history");
    var userName = req.query.userName;
    
    console.log(userName);
    Booking.find({'userId': userName}, function(err,book){
        if(book){
            console.log(book);
            res.json({bookings: book});
        }
        
    });
    
}
