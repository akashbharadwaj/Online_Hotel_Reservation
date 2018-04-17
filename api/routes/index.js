var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var multer = require('multer');
var User = mongoose.model('User');
var passport = require('passport');
var local = require('passport-local');
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlBookings = require('../controllers/bookings.controllers.js');
var ctrlWishlist = require('../controllers/wishlist.controllers.js');
/*
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

*/

//Home Page
router 
    .route('/')
    .get(ctrlUsers.LandingPage);
//np
router 
    .route('/Users')
    .post(ctrlUsers.VerifyUser);
//np
router
    .route('/Users')
    .get(ctrlUsers.returnUserName);
//np
router 
    .route('/Users/signUp')
    .post(ctrlUsers.signUpUnameExists);

router 
    .route('/Users/logout')
    .get(ctrlUsers.logout);

//np
router
    .route('/hotels')
    .get(ctrlHotels.listHotels);
//np
router
    .route('/hotels')
    .post(ctrlHotels.addHotel);
//np  
router
    .route('/hotels/:hotelId')
    .delete(ctrlHotels.deleteHotel);

router
    .route('/hotels')
    .put(ctrlHotels.updateHotel);

router
    .route('/hotels/rooms')
    .put(ctrlHotels.updateHotelRoom);

router
    .route('/hotels/rooms/:hotelId/:roomId')
    .delete(ctrlHotels.deleteHotelRoom);
//np
router
    .route('/hotels/rooms')
    .post(ctrlHotels.addHotelRoom);
//np
router
    .route('/orders')
    .get(ctrlBookings.listHotelBookings);
//np
router
    .route('/hotels/rooms/:hotelId')
    .get(ctrlHotels.showRoomTypes);

router
    .route('/orders/hotels/rooms')
    .post(ctrlBookings.checkAvailability);

router
    .route('/orders')
    .post(ctrlBookings.checkOut);
//changed to bookings from users
//np
router
    .route('/orders/:userName')
    .get(ctrlBookings.retrieveOrderHistory);
//np
router
    .route('/wishlist')
    .post(ctrlWishlist.addToWishList);
//changed to wiahlist from users
//np
router
    .route('/wishlist/:userName')
    .get(ctrlWishlist.retrieveWishList);
//np
router
    .route('/wishlist/:hotelName')
    .delete(ctrlWishlist.removeFromWishList);
//np
router
    .route('/orders/:id')
    .delete(ctrlBookings.cancelBooking);
/*
router.post('/users/login', passport.authenticate('local'), login);

function localStrategy(username,password, done ){
    User
        .findUserByCredentials(username,password)
        .then(function(user){
            if(user)
            {
                done(null, user)
            } else {
                done(null, false)
            }
        }, function(error){
            done(error, false)
        }
    )
}

function login(req, res) {
    res.json(req.user);
}




/*
router
    .route('/users/login')
    .post(passport.authenticate('local'),ctrlUsers.login);

/*
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
        });
    }
    ));
    
router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:''}),
    function(req, res) {
        res.redirect('/');
      
    });
*/
/*
function serializeUser(user, done) {
    done(null, user.id);
  };
  
function deserializeUser(user, done) {
    User.findById(user._id)
        .then(
            function(user){
                done(null,user);
            },
            function(err){
                done(err,null);
            }
        )
      done(err, user);
    });
  };

*/


module.exports = router;