var express = require('express');
var router = express.Router();
var multer = require('multer');

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlBookings = require('../controllers/bookings.controllers.js');
var ctrlWishlist = require('../controllers/wishlist.controllers.js');


//Home Page
router 
    .route('/')
    .get(ctrlUsers.LandingPage);

router
    .route('/signUpPage')
    .get(ctrlUsers.SignupPage);
router 
    .route('/login')
    .post(ctrlUsers.VerifyUser);

router
    .route('/userAccess')
    .get(ctrlUsers.returnUserName);

router 
    .route('/signUpUnameExists')
    .post(ctrlUsers.signUpUnameExists);
router
    .route('/hotels/list')
    .get(ctrlHotels.listHotels);

router
    .route('/hotel/new')
    .post(ctrlHotels.addHotel);
    
router
    .route('/hotel/delete/:hotelId')
    .delete(ctrlHotels.deleteHotel);

router
    .route('/hotel/update')
    .put(ctrlHotels.updateHotel);
router
    .route('/hotel/room/update')
    .put(ctrlHotels.updateHotelRoom);
router
    .route('/hotels/room/delete/:hotelId/:roomId')
    .delete(ctrlHotels.deleteHotelRoom);

router
    .route('/hotel/room/new')
    .post(ctrlHotels.addHotelRoom);

router
    .route('/hotel/bookings')
    .get(ctrlBookings.listHotelBookings);

router
    .route('/hotel/:hotelID')
    .get(ctrlHotels.showRoomTypes);

router
    .route('/hotel/room/checkAvalability')
    .post(ctrlBookings.checkAvailability);

router
    .route('/hotel/room/checkOut')
    .post(ctrlBookings.checkOut);

router
    .route('/profile/bookings/:userName')
    .get(ctrlUsers.retrieveOrderHistory);

    console.log("wishhh");
router
    .route('/hotel/addToWishList')
    .post(ctrlWishlist.addToWishList);

router
    .route('/profile/wishList/:userName')
    .get(ctrlUsers.retrieveWishList);

router
    .route('/profile/wishList/delete/:hotelName')
    .delete(ctrlWishlist.removeFromWishList);

router
    .route('/hotel/booking/cancel/:id')
    .delete(ctrlBookings.cancelBooking);

module.exports = router;