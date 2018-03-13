var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

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

};