

var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');
var Hotel = mongoose.model('Hotel');
var User = mongoose.model('User');
var wishList = mongoose.model('wishList');
 
module.exports.addToWishList = function (req, res) {
    console.log("insdei wiahlist");
    var hotelName = req.body.hotelName;
    console.log("Hotel Name: "+hotelName);
    var userName = User_Name;
    var flag = false;
    var wishListData = {
        "userId": userName,
        "hotelName":hotelName
    };
    wishList.findOne({ 'userId': userName },function (err, wish) {
        
        console.log(wish);
        if(wish!=null)
        {   
            console.log("inside wish");
            var myarr = wish.hotelName;
            var arrayContainsHotelName = (myarr.indexOf(hotelName) > -1);
            console.log("hotel present"+arrayContainsHotelName);
            if(!arrayContainsHotelName)
            {
                try {
                    wish.hotelName.push(hotelName);
                }
                catch (e) {
                    console.log("Exception:" + e);
                    res.json({hotelAdd: true});
                }
                                              
                wish.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json({hotelAdd: false});
                    }

                    console.log("success");
                    res.json({hotelAdd: true});

                });
                   
            }
        }
        else
        {   
            console.log("Null");
            var wishlist = new wishList(wishListData);
            wishlist.save(function (err, cb) {
            if (err) {
                console.log("error");
                console.log(err);
                //res.render("homepage");
                res.json("error");
            }
            else {
                               
                res.json({hotelAdd: true});
            }
        });
        }
    });

    /*
    var numberOfRooms = req.body.quantity;
    var User_Name = req.body.userName;
    //var dateString='Mon Jan 12 00:00:00 GMT 2015';
    /*
    startDate = startDate.toUTCString();
    var startDate1 = startDate.split(' ');
    startDate = startDate1[0];
    endDate = endDate.toUTCString();
    var endDate1 = endDate.split(' ');
    endDate = endDate1[0];
    
    //console.log(dateString);    
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
    */
}

module.exports.removeFromWishList = function(req,res) {

    var userHotelName = req.params.hotelName;
    
    wishList.findOne({'userId': User_Name},function(err,wish){
        if(err)
        {
            res.json(err);
        }
        else
        {   
            var myarr = wish.hotelName;
            //var arrayContainsHotelName = (myarr.indexOf(userHotelName) > -1);
            //wish.hotelName[myarr.indexOf(userHotelName)].re
            wish.hotelName.splice(myarr.indexOf(userHotelName), myarr.indexOf(userHotelName)+1);
            //result.hotelName = true;
            wish.save();
            res.json(wish);
        }
    });
}

module.exports.retrieveWishList = function(req,res){

    console.log("Wish List history");
    var userName = req.query.userName;

    console.log(userName);
    wishList.findOne({'userId': userName}, function(err,wish){
        if(wish){
            console.log(wish);
            res.json({wishlist: wish.hotelName});
        }
    });
}
