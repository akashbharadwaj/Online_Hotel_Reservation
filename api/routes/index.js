var express = require('express');
var router = express.Router();
var multer = require('multer');

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlBookings = require('../controllers/bookings.controllers.js');


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
    .route('/hotels/:hotelName/delete')
    .get(ctrlHotels.deleteHotel);

router
    .route('/hotel/:hotelName/update')
    .post(ctrlHotels.updateHotel);
router
    .route('/hotel/:hotelName/:roomType/update')
    .post(ctrlHotels.updateHotelRoom);
router
    .route('/hotel/:hotelName/:roomType/delete')
    .delete(ctrlHotels.deleteHotelRoom);

router
    .route('/hotel/room/new')
    .post(ctrlHotels.addHotelRoom);

router
    .route('/hotel/:hotelID')
    .get(ctrlHotels.showRoomTypes);

router
    .route('/hotel/room/checkAvalability')
    .post(ctrlBookings.checkAvailability);

router
    .route('/hotel/room/checkOut')
    .post(ctrlBookings.checkOut);

module.exports = router;