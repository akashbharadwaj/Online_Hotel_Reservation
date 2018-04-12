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
    //console.log("redirected to list hotels");
    var searchTerm = req.query.name;

    console.log("search key "+searchTerm);
    Hotel.find({$and : [{$or:[{'location': searchTerm }, {'name' : searchTerm}]},{'flagDeleted': false}]} , function (err, hotelListings) {
        console.log("inside");
        if (err) {
            console.log(error);
        } //else {
            //if(hoterlListings == null){
                //checking if the search by location returned null?
           // }
           //console.log(hotelListings);
            res.json({List: hotelListings});
        
    });
    
};





/*
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
*/
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
    console.log("Delete hotel");
    var id = req.params.hotelId;
    console.log(req.params.hotelId);
    //var location = req.body.location;
    Hotel.findOne({_id: id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else
        {   
            result.flagDeleted = true;
            result.save();
            res.json(result);
        }
    });
    


}

module.exports.updateHotel = function (req, res) {
    console.log("Upadate hotel");
    //var oldName = req.params.hotelName;
    var name = req.body.hotelName;
    var location = req.body.location;
    var description = req.body.description;
    var services = req.body.services;
    var photos = req.body.photos;
    var hotelId = req.body.hotelId;
    //var room = req.body.room;
    console.log("HotelID: "+hotelId);
    var servicesArr = [];
    if (services != undefined) {
        servicesArr = services.split(",")
    }

    var photosArr = [];
    if (photos != undefined) {
        photosArr = photos.split(",");
    }

    //console.log(oldName + " " + name);
    //var toUpdateData = [name,location,description];

    Hotel.findOne({ '_id': hotelId }, function (err, hotel) {
        if (err) {
            console.log("error" + err);
            res.json({msg: false});
        }
        else {
            console.log(hotel);                   
                               
            if (name != undefined) {
                hotel.name = name;
            }
            if (location != undefined) {
                hotel.location = location;
            }
            if (description != undefined) {
                hotel.description = description;
            }
            if (servicesArr != undefined || servicesArr.length != 0) {
                hotel.services = servicesArr;
            }
            if (photosArr != undefined || photosArr.length != 0) {
                hotel.photos = photosArr;
            }

            hotel.save();
            res.json({msg: true});

        }
    });
}

//having problems
module.exports.addHotelRoom = function (req, res) {

    console.log("Add rooms");
    var name = req.body.hotelName;
    console.log(name);
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
            res.json({msg: true});
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
                            res.json({msg: true});
                        }
                        var subdoc = roomsHotel.rooms;
                        // console.log(subdoc);
                        subdoc.isNew;
                        //console.log(subdoc.isNew);
                        roomsHotel.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({msg: true});
                            }

                            console.log("success");
                            res.json({msg: false});

                        });

                    });
                }
            }
        }
    });
}



module.exports.updateHotelRoom = function (req, res) {

    console.log("Update rooms");
    var hotelId = req.body.hotelId;
    console.log("Hotel ID: "+hotelId);
    var roomId = req.body.roomId;
    var roomType = req.body.roomType;
    var number = req.body.number;
    var description = req.body.description;
    var photos = req.body.photos;
    var price = req.body.price;
    var photosArr = [];
    console.log("roomType: "+ roomType+" number: "+number+" description: "+ description+" price: "+price);
    if (photos != undefined) {
        //console.log(photos);
        photosArr = photos.split(",");
        //console.log(photosArr);
    }
    //console.log(photosFinArr[0]);
    //var roomID;

    //console.log(oldName+" "+name);
    //console.log(toUpdateData[0]+toUpdateData[1]+toUpdateData[2]+toUpdateData[3]+toUpdateData[4]);

    Hotel.findOne({ '_id': hotelId }, function (err, hotel) {
        console.log(hotel);
        if (err) {
            console.log("error" + err);
            res.json({msg: true});
        }
        else {
            console.log(hotel.rooms.length);

            for (var i = 0; i < hotel.rooms.length; i++) {
                console.log(hotel.rooms[i].roomType);
                if (hotel.rooms[i]._id == roomId) {
                    console.log("Room Id: "+roomId);
                    //roomID = hotel.rooms[i]._id;
                    //console.log(roomID);
                    //console.log("i"+i);
                    var j = i;
                    //var doc = hotel.rooms.id(roomID);
                    //doc = doc.toObject();
                    //console.log(doc);
                    if (roomType != undefined) {
                        console.log("roomtype");
                        hotel.rooms[j].roomType = roomType;
                    }
                    if (number != undefined) {
                        console.log("number");
                        hotel.rooms[j].number = number;
                    }
                    if (description != undefined) {
                        console.log("description");
                        hotel.rooms[j].description = description;
                    }
                    if (price != undefined) {
                        console.log("price");
                        hotel.rooms[j].price = price;
                    }
                    if (photosArr.length > 0) {
                        console.log("photos");
                        hotel.rooms[j].photos = photosArr;
                    }
                        
                    hotel.save();
                    res.json({msg: true});
                }

            }
        }
    });

}

module.exports.deleteHotelRoom = function (req, res) {
    
    var id = req.params.hotelId;
    var roomId = req.params.roomId;
    console.log("hotelid: "+id);
    console.log("roomid: "+roomId);
    Hotel.findOne({ '_id': id }, function (err, hotel) {
        if (err) {
            console.log("error" + err);
        }
        else {
            console.log(hotel.rooms.length);

            for (var i = 0; i < hotel.rooms.length; i++) {
                //console.log(hotel.rooms[i].roomType);
                if (hotel.rooms[i]._id == roomId) {

                    var j = i;
                    
                    hotel.rooms[j].flagDeletedRooms = true;
                    hotel.save();
                    console.log("delete success");
                    res.json(hotel.rooms);
                    /*
                    hotel.rooms[j].remove(function (err) {

                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                        else {
                            hotel.save();
                            console.log("delete success");
                            res.json(hotel.rooms);
                        }

                        
                    });
                    */

                }
            }
        }
    });
}

module.exports.showRoomTypes = function (req, res) {
    
    var hotelId = req.query.id;
    console.log("ID: "+hotelId);
    //{$and:[{'_id': hotelId }, {'rooms.flagDeletedRooms' : false}]}
    Hotel.findOne({ '_id': hotelId }, function (err, room){
        if(err){
            console.log(err);
        }
        else
            res.json({rooms: room.rooms});
        //res.render("showRooms",{result: hotel.rooms});

    })
}



