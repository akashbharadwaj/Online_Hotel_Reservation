var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var roomsModel = new Hotel;
var multer = require('multer');
/*
module.exports.hotelsGetAll = function (req, res) {
    //
    var offset = 0;
    var count = 5;

    if (req.query && req.query.lng && req.query.lat) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, hotels) {
            
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);


        });
    };//

module.exports.hotelsGetOne = function (req, res) {

    //var db = dbconn.get();
    //var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET the hotelId", hotelId);
    //console.log(ObjectId(hotelId));
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc);
        });
    };//
*/

module.exports.listHotels = function (req, res) {
    //

    Hotel
        .find()
        .exec(function (err, hotels) {

            console.log("Found hotels", hotels.length);
            res
                .json(hotels);


        });
};//
/*
module.exports.hotelsGetOne = function (req, res) {

    //var db = dbconn.get();
    //var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    //var thisHotel = hotelData[hotelId];
    console.log("GET the hotelId", hotelId);
    //console.log(ObjectId(hotelId));
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc);
        });
};//
*/
module.exports.addHotel = function (req, res) {
    console.log("POST new hotel");
    
    var name = req.body.hotelName;
    var location = req.body.location;
    var description = req.body.description;
    var services = req.body.services;
    var photos = req.body.photos;
    //var rooms = req.body.rooms;
    var flagDeleted = false;

    var servicesFinArr = [];
    var servicesArr = services.split(",");
    servicesArr.forEach(element => {
        servicesFinArr.push(element);
        console.log(element);
    });
    
    var photosFinArr = [];
    photosFinArr = photos;
    /*
    var photosArr = photos.split(",");
    photosArr.forEach(element => {
        photosFinArr.push(element);
        console.log(element);
    });
    */
    var data = {
        name: name,
        location: location,
        description: description,
        services: servicesFinArr,
        photos: photosFinArr,
        flagDeleted: false,
        //rooms : []


    };
    var newHotel = new Hotel(data);
    newHotel.save(function (err) {
        if (err) {
            console.log("error");
            console.log(err);
            //res.render("homepage");
            res.json({msg:true});
        }
        else
            console.log("Why");
            console.log("success");
        // res.render("homepage");
        //res.send("sucess");
            res.json({msg: false});
    });
};

//delete a hotel
module.exports.deleteHotel = function (req, res) {

    var name = req.params.hotelName;
    console.log(req.params.hotelName);
    //var location = req.body.location;

    Hotel.findOne({ 'name': name }, 'name', function (err, hotel) {

        console.log(hotel.name);
        if (hotel.name != null) {
            //delete the hotel
            hotel.remove(function (err) {

                if (err) {
                    console.log(err);
                }
                else {
                    console.log("delete success");
                    res.json("delete success");
                }


            });
        }
        else {
            //send error message
            res.json("Hotel does not exist");
        }
    });


}

module.exports.updateHotel = function (req, res) {

    var oldName = req.params.hotelName;
    var name = req.body.name;
    var location = req.body.location;
    var description = req.body.description;
    var services = req.body.services;
    var photos = req.body.photos;
    //var room = req.body.room;

    var servicesArr = [];
    if (services != undefined) {
        servicesArr = services.split(",")
    }

    var photosArr = [];
    if (photos != undefined) {
        photosArr = photos.split(",");
    }

    console.log(oldName + " " + name);
    //var toUpdateData = [name,location,description];

    Hotel.findOne({ 'name': oldName }, '_id', function (err, hotel) {
        if (err) {
            console.log("error" + err);
        }
        else {
            console.log(hotel);
            if (hotel._id != null) {
                if (toUpdateData[0] != undefined) {
                    //update name
                    console.log(toUpdateData[0]);
                    Hotel.findOne({ '_id': hotel._id }, function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (name != undefined) {
                                doc.name = name;
                            }
                            if (location != undefined) {
                                doc.location = location;
                            }
                            if (description != undefined) {
                                doc.description = description;
                            }
                            if (servicesArr != undefined || servicesArr.length != 0) {
                                doc.services = servicesArr;
                            }
                            if (photosArr != undefined || photosArr.length != 0) {
                                doc.photos = photosArr;
                            }

                            doc.save();

                        }
                    });
                }
                /*
                if (servicesFinArr!=undefined || servicesFinArr.length!=0)
                {
                    //update services
                    //console.log(toUpdateData[3]);
                    Hotel.updateOne({ '_id': hotel._id },{
                        $set : {"services" : servicesFinArr}
                               
                    }).catch(function(err,affected,resp){
    
                        console.log(err);
    
                    });
                    
                }
                if (photosFinArr!=undefined || photosFinArr.length!=0)
                {
                    //update services
                    //console.log(toUpdateData[3]);
                    Hotel.updateOne({ '_id': hotel._id },{
                        $set : {"photos" : photosFinArr}
                               
                    }).catch(function(err,affected,resp){
    
                        console.log(err);
    
                    });
                    
                }
                */
                res.json("success");
            }

            else {
                //send error message
                res.json("Hotel does not exist");
            }

        }
    });
}

//having problems
module.exports.addHotelRoom = function (req, res) {

    console.log("Add rooms");
    var name = req.body.name;
    var type = req.body.type;
    var number = req.body.number;
    var description = req.body.description;
    var photos = req.body.photos;
    var price = req.body.price;

    if (photos != undefined) {
        var PhotosFinArr = [];
        var photosArr = photos.split(",");

        photosArr.forEach(element => {
            PhotosFinArr.push(element);
            //console.log(element);
        });
    }
    //console.log(oldName+" "+name);
    var toUpdateData = [type, number, description, photos, price];

    Hotel.findOne({ 'name': name }, '_id', function (err, hotel) {
        if (err) {
            console.log("error" + err);
        }
        else {
            console.log(hotel);
            if (hotel._id != null) {
                if (toUpdateData[0] != undefined) {
                    //update name
                    console.log(toUpdateData[0]);


                    Hotel.findOne({ '_id': hotel._id }, function (err, roomsHotel) {
                        console.log(roomsHotel);
                        console.log(roomsHotel.rooms);
                        try {
                            roomsHotel.rooms.push({ roomType: toUpdateData[0], number: toUpdateData[1], description: toUpdateData[2], photos: PhotosFinArr, price: toUpdateData[4] });
                        }
                        catch (e) {
                            console.log("Exception:" + e);
                        }
                        var subdoc = roomsHotel.rooms;
                        // console.log(subdoc);
                        subdoc.isNew;
                        //console.log(subdoc.isNew);
                        roomsHotel.save(function (err) {
                            if (err) {
                                console.log(err);
                            }

                            console.log("success");


                        });

                    });
                }
            }
        }
    });
}



module.exports.updateHotelRoom = function (req, res) {

    console.log("Update rooms");
    var name = req.params.hotelName;
    var roomType = req.params.roomType;
    var newRoomType = req.body.newRoomType;
    var number = req.body.number;
    var description = req.body.description;
    var photos = req.body.photos;
    var price = req.body.price;
    var photosArr = [];
    if (photos != undefined) {
        //console.log(photos);
        photosArr = photos.split(",");
        //console.log(photosArr);
    }
    //console.log(photosFinArr[0]);
    //var roomID;

    //console.log(oldName+" "+name);
    //console.log(toUpdateData[0]+toUpdateData[1]+toUpdateData[2]+toUpdateData[3]+toUpdateData[4]);

    Hotel.findOne({ 'name': name }, function (err, hotel) {
        if (err) {
            console.log("error" + err);
        }
        else {
            console.log(hotel.rooms.length);

            for (var i = 0; i < hotel.rooms.length; i++) {
                console.log(hotel.rooms[i].roomType);
                if (hotel.rooms[i].roomType == roomType) {
                    //roomID = hotel.rooms[i]._id;
                    //console.log(roomID);
                    //console.log("i"+i);
                    var j = i;
                    //var doc = hotel.rooms.id(roomID);
                    //doc = doc.toObject();
                    //console.log(doc);
                    if (newRoomType != undefined) {
                        hotel.rooms[j].roomType = newRoomType;
                    }
                    if (number != undefined) {
                        hotel.rooms[j].number = number;
                    }
                    if (description != undefined) {
                        hotel.rooms[j].description = description;
                    }
                    if (price != undefined) {
                        hotel.rooms[j].price = price;
                    }
                    if (photosArr.length > 0)
                        hotel.rooms[j].photos = photosArr;
                    hotel.save();
                }

            }
        }
    });

}

module.exports.deleteHotelRoom = function (req, res) {



    var name = req.params.hotelName;
    var roomType = req.params.roomType;
    Hotel.findOne({ 'name': name }, function (err, hotel) {
        if (err) {
            console.log("error" + err);
        }
        else {
            console.log(hotel.rooms.length);

            for (var i = 0; i < hotel.rooms.length; i++) {
                console.log(hotel.rooms[i].roomType);
                if (hotel.rooms[i].roomType == roomType) {

                    var j = i;

                    hotel.rooms[j].remove(function (err) {

                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("delete success");
                            res.json("delete success");
                        }

                        hotel.save();
                    });

                }
            }
        }
    });
}

module.exports.showRoomTypes = function (req, res) {

    var hotelName = req.params.hotelName;
    Hotel.findOne({ 'name': hotelName }, function (err, hotel){
        if(err){
            console.log(err);
        }
        else
            res.json("success");
        //res.render("showRooms",{result: hotel.rooms});

    })
}



