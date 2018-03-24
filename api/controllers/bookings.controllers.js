var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');
var Hotel = mongoose.model('Hotel');

var startDate;
var endDate;
var availability;
var hotelId;
var roomId;
module.exports.checkAvailability = function (req, res) {
    startDate = req.body.startDate;
    endDate = req.body.ensdDate;
    var hotelName = req.params.hotelName;
    var roomType = req.params.roomType;
    var numberOfRooms;

    Hotel.findOne({ "name": hotelName }, "_id", function (err, hotel) {
        hotelId = hotel._id;

        for (var i = 0; i < hotel.rooms.length; i++) {
            console.log(hotel.rooms[i].roomType);
            if (hotel.rooms[i].roomType == roomType) {

                var j = i;
                roomId = hotel.rooms[j]._id;
                numberOfRooms = hotel.rooms[j].number;

                Booking.find({ "hotelId": hotelId, "roomId": roomId }, function (err, booking) {

                    booking.forEach(element => {
                        if ((element.startDate <= startDate) || (startDate <= element.endDate)) {
                            numberOfRooms = numberOfRooms - element.numberOfRoomsBooked;

                        }
                        else if ((element.startDate <= endDate) || (endDate <= element.endDate)) {
                            numberOfRooms = numberOfRooms - element.numberOfRoomsBooked;

                        }
                    });

                    availability = numberOfRooms;
                    //response - send availability of the rooms
                });
            }
        }

    });

}

module.exports.checkOut = function (req, res) {

    var numberOfRooms = req.body.numberOfRooms;
    if (availability >= numberOfRooms) {

        var bookingData = {
            "hotelId": hotelId,
            "roomId": roomId,
            "userId": User_Name,
            "numberOfRoomsBooked": numberOfRooms,
            "startDate": startDate,
            "endDate": endDate,
        };
        var newBooking = new Booking(data);
        newBooking.save(function (err) {
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
                res.json({ "name": "Aknhsdcj" });
            }
        });
    }
    else {
        //send a message saying selected number is greater than available
    }
}



