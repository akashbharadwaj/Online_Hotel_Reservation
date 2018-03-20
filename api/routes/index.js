var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

//Home Page
router 
    .route('/')
    .get(ctrlUsers.LandingPage);
/*
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne);
*/
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

/*
router
    .route('/hotel/room/update')
    .post(ctrlHotels.updateRoom);
*/
router
    .route('/hotel/room/new')
    .post(ctrlHotels.addHotelRoom);

//to get reviews
/*
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne);
    
*/
router
    .route('/signUpPage')
    .get(ctrlUsers.SignupPage);
/*
router
    .route('/signUp')
    .post(ctrlUsers.AddUser);
*/
router 
    .route('/login')
    .post(ctrlUsers.VerifyUser);

router 
    .route('/signUpUnameExists')
    .post(ctrlUsers.signUpUnameExists);

module.exports = router;