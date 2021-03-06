var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var Booking = mongoose.model('Booking');
var Hotel = mongoose.model('Hotel');
var wishList = mongoose.model('wishList');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var express = require('express');
//var app = express();

//app.set("view engine","ejs");
//var bodyparser = require('body-parser');


module.exports.LandingPage = function(req,res)
{
    //res.render("landing");
    res.json();
};


/*
module.exports.SignupPage = function(req,res)
{
    res.render("signupPage");
};

*/

module.exports.signUpUnameExists = function(req,res)
{   
    console.log("SignUp Exists");
    //console.log(req);
    //var data = JSON.parse(req.body);
    
    var userName = req.body.email;
    var password = req.body.password;
    var name = req.body.fullName;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {

            if(err)
            {
                //console.log(err);
            }
            else
                //console.log(hash);
                password = hash;
                var data = {
                    userName : userName,
                    password : password,
                    name : name,
                    access : 0
            
                };
                User.findOne({ 'userName': userName },'userName',function (err, user) {
                    console.log(user);
                    if(user==null)
                    {   
                        console.log("user");
                        console.log("how");
                        //save the user record
                        var userRecord = new User(data);
                        userRecord.save(function(err){
                        if(err)
                        {
                            console.log("error");
                            console.log(err);
                            //res.render("homepage");
                        }
                        else
                        {   
                            User_Name = userName;
                            User_Admin = false;
                            console.log("success");
                           // res.render("homepage");
                            //res.send("sucess");
                            res.json({"msg" : true});
                        }
                        });
                        //User.save
                    }
                    else
                    {
                        res.json({"msg" : false});
                    }
                })
            // Store hash in your password DB.
        });
    });
    //console.log(password);
    //console.log("name"+name+",Uname"+userName+",password"+password);
    
    
   
};

















/*
//Create new user
module.exports.AddUser = function (req, res) {

   // var db = dbconn.get();
    //var collection = db.collection('hotelData');
    //var newhotel;

    //console.log("db", db);
    console.log("POST new User");

    
    var userName = req.body.userName;
    var password = req.body.password;
    var name = req.body.name;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {

            if(err)
            {
                console.log(err);
            }
            else
                console.log(hash);
            // Store hash in your password DB.
        });
    });

    */
    /*
    if (req.body && req.body.name && req.body.stars) {
        newhotel = req.body;
        newhotel.stars = parseInt(req.body.stars, 10);

        collection.insertOne(newhotel, function (err, response) {
            //console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        });
    } else {

        console.log("Data missing from body")
        res
            .status(400)
            .json({ message: "Required data missing from body" });
    }

    */



//Login

module.exports.VerifyUser = function(req,res){

    console.log("POST Login");
    //res1.render("login");
    
    var userName = req.body.userName;
    var password = req.body.password;
    var access;
    //fetch hashed password for the given userName
    //hash = "$2a$10$rx3k2p7va6ULW3AROSECn.3SwF1TieKdN3ubYiT6TCdNRt7vKN.E6";
    //password = "akash123";
    console.log("username: "+userName);
    User.findOne({ 'userName': userName }, function (err, user) {
        //console.log(user.length);
        if (err) return handleError(err);

        if(user)
        {   
            //console.log(user);

            // Prints "Space Ghost is a talk show host".
            /*
            user.forEach((result)=>{
                passwordDb = result.password;
                access = result.access;
                //console.log(password + access);
            })
            */
            //console.log(passwordDb);
            //console.log(access);
            //console.log(user.access);
            var passwordDb = user.password;
            var access = user.access;
            var hash = passwordDb;
            //console.log(hash);
            bcrypt.compare(password, hash, function(err, res2) {
                if(err)
                {
                    console.log(err);
                }
                if(res2==true)
                {      
                    /*
                    const token = jwt.sign(user,'yourSecret', {

                        expiresIn: 604800 //1week

                    });
                      */                
                    //console.log("inside bcrypt");
                    if(access==1)
                    {
                        User_Admin = true;
                    }
                    else
                    {
                        User_Admin = false;
                    }
                    //console.log("passwords matched");
                    //console.log("err "+err);
                    User_Name = userName;
                    console.log(User_Admin);
                    //res.render("homepage");
                    //render the home page
                    /*
                    res.json({
                        msg: true,
                        token: 'JWT '+token,
                        user:{
                            id: user._id,
                            name: user.name,
                            userName: user.userName
                        }
                    })  
                    */
                   /*
                const token = jwt.sign(userinfo, 'yourSecret',{
                expiresIn: 60488
                });
                console.log("tokem created "+ token);
                res.json({ 
                    msg: true, 
                    token : token,
                    user : {
                        id: user._id,
                        userName : user.userName,
                        access: User_Admin,
                        name: user.name
                    }
                });
                */
                res.json({msg: true, access: User_Admin});
                }
            });
            bcrypt.compare(password, hash, function(err, res3) {
                if(res3==false)
                {
                    //console.log("passwords dint match");
                    //res.render("loginerr");
                    res.json({msg: false});
                    //post an error saying paaword or userName is wrong
                }
            });

        }
        else{
            
            res.json({msg: false});
        }
        
    });
    
};

module.exports.returnUserName = function(req,res){
    console.log(User_Name);
    if(User_Name!="")
    {
        User.findOne({ 'userName': User_Name },function (err, user) {
            //console.log(user.name);
            name = user.name;
            res.json({access: User_Admin, uName: User_Name, Name: name});
        });
    }
    
    
    
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


/*
//Get all the reviews of a hotel
module.exports.reviewsGetAll = function(req, res){
    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET the hotelId", hotelId);
    //console.log(ObjectId(hotelId));
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec (function (err, doc) {
        res
            .status(200)
            .json(doc.reviews);
    });




};
//Get the particular review based on the review ID
module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    console.log("GET the hotelId "+hotelId+" and the reviewId "+reviewId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec (function (err, hotel) {
        console.log("returned hotel "+hotel);
        var review = hotel.reviews.id(reviewId);
        res
            .status(200)
            .json(review);
    });



//5a7770325b534d635a310ebd
//5a7545704923fc87abf4bf47

};*/


module.exports.addToWishList = function (req, res) {
    console.log("insdei wiahlist");
    var hotelName = req.body.hotelName;
    var userName = User_Name;
    var flag = false;
    var wishListData = {
        "userId": userName,
        "hotelName":hotelName
    };
    wishList.findOne({ 'userId': userName },function (err, wish) {
        
        if(wish!=null)
        {   
            var myarr = wish.hotelName;
            var arrayContainsHotelName = (myarr.indexOf(hotelName) > -1);
            if(!arrayContainsHotelName)
            {
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
        }
        else
        {
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


module.exports.logout = function (req, res) {

    User_Admin = false;
    User_Name = "";
    name = "";
}

module.exports.login = function(req, res) {
    
    res.json();

}
