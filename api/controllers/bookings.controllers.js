var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');
var Hotel = mongoose.model('Hotel');
var User = mongoose.model('User');

var startDate;
var endDate;
var availability;
var hotelID;
var roomID;
var bookingId;
module.exports.checkAvailability = function (req, res) {
    console.log("Availability");
    startDate = req.body.startDate;
    endDate = req.body.endDate;
    hotelID = req.body.hotelID;
    roomID = req.body.roomID;
    var startDateDB;
    var endDateDB;
    var numberOfRooms;
    console.log("hotelID: "+ hotelID);
    Hotel.findOne({ "_id": hotelID },function (err, hotel) {
        //hotelId = hotel._id;

        for (var i = 0; i < hotel.rooms.length; i++) {
           // console.log(hotel.rooms[i].roomType);
            if (hotel.rooms[i]._id == roomID) {

                var j = i;
                //roomId = hotel.rooms[j]._id;
                numberOfRooms = hotel.rooms[j].number;
                console.log(numberOfRooms);
                startDate = new Date(startDate);
                Booking.find({ "hotelId": hotelID, "roomId": roomID }, function (err, booking) {
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

module.exports.checkOut = function (req, res) {

    var numberOfRooms = req.body.quantity;
    var User_Name = req.body.userName;
    if (availability >= numberOfRooms) {

        var bookingData = {
            "hotelId": hotelID,
            "roomId": roomID,
            "userId": User_Name,
            "numberOfRoomsBooked": numberOfRooms,
            "startDate": startDate,
            "endDate": endDate,
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
                
                User.findOne({ 'userName': User_Name },function (err, user) {

                    try {
                        user.orderHistory = bookingId;
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



