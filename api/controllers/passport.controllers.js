var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var Booking = mongoose.model('Booking');
var Hotel = mongoose.model('Hotel');
var wishList = mongoose.model('wishList');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var express = require('express');
//var app = express();

//app.set("view engine","ejs");
//var bodyparser = require('body-parser');

module.exports = function(passport) {

    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'yourSecret';
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));

}
