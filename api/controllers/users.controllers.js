var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
//var express = require('express');
//var app = express();

//app.set("view engine","ejs");
//var bodyparser = require('body-parser');

module.exports.LandingPage = function(req,res)
{
    res.render("landing");
};



module.exports.SignupPage = function(req,res)
{
    res.render("signupPage");
};


module.exports.signUpUnameExists = function(req,res)
{   
    console.log("SignUp Exists");
    //console.log(req);
    //var data = JSON.parse(req.body);
    
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
                            
                            console.log("success");
                           // res.render("homepage");
                            //res.send("sucess");
                            res.json({"name" : "Aknhsdcj"});
                        }
                        });
                        //User.save
                    }
                    else
                    {
                        res.render("homepage");
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
    
    User.find({ 'userName': userName }, function (err, user) {
        if (err) return handleError(err);
        if(user.length!=0)
        {   
            console.log(user);

            // Prints "Space Ghost is a talk show host".
            user.forEach((result)=>{
                passwordDb = result.password;
                access = result.access;
                //console.log(password + access);
            })

            console.log(passwordDb);
            console.log(access);
            //console.log(user.access);
            var hash = passwordDb;
            console.log(hash);
            bcrypt.compare(password, hash, function(err, res2) {
                if(res2==true)
                {   
                    console.log("inside bcrypt");
                    if(access==1)
                    {
                        User_Admin = true;
                    }
                    
                    console.log("passwords matched");
                    console.log("err "+err);
                    console.log(User_Admin);
                    res.render("homepage");
                    //render the home page
                }
            });
            bcrypt.compare(password, hash, function(err, res3) {
                if(res3==false)
                {
                    console.log("passwords dint match");
                    res.render("loginerr");
                    //post an error saying paaword or userName is wrong
                }
            });

        }
        else{
            //
            res.render("loginerr");
        }
        
    });
    
};






















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
