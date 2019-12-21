//  API server
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('../database/connect.js');
const Reservation = require('../database/Reservation.js');
const Mapper = require('../database/Mapper.js');
const Restaurant = require('../database/Restaurant.js');

let app = express();

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//  get all reservations (for testing)
app.get('/reservation/all', function (req, res) {
  Reservation.read()
    .then((reservations) => {
      res.write(JSON.stringify(reservations));
      res.end();
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

//  check if reservation can be accepted and add to the database if so
app.post('/reservation', function (req, res) {
  //  post if you can; return success
  //  if post not allowed, return error message
  //  errors can be: username already has a reservation,
  //    reservation overlaps too many (too many tables used)
  var booking = req.body;

  Reservation.make(booking)
    .then((notification) => {
      res.write(JSON.stringify(notification));
      res.end();
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

//!! RON'S ADDITION FOR THE PUT REQUEST TO UPDATE THE RESERVATION
//PUT is update: mongo _id field is included in the object res, use
//Maybe use:
//https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/
//or https://docs.mongodb.com/manual/reference/method/db.collection.update/
//db.collection.replaceOne(), or db.collection.update()
app.put('/reservation', function (req, res) {
  const booking = req.body;
  console.log(booking);
  //const time = req.params.restaurant_time;
  // res.send(booking)
  Reservation.updateReservation(booking)
    .then((notification) => {
      // console.log(notification);
      res.write(JSON.stringify(notification));
      res.end();
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
      res.end();
    });
  // res.send("Updated!");
});

//!! END OF PUT REQUEST ADDED BY RON

//  get all maps (for testing)
app.get('/mapper/all', function (req, res) {
  Mapper.getAll()
    .then((maps) => {
      res.write(JSON.stringify(maps));
      res.end();
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

//  get restaurant geolocator for call to google maps api
//jeff sugests I work on this one.
app.get('/mapper/:restaurantId', function (req, res) {
  var restaurantId = req.params.restaurantId;
  Mapper.getOne(restaurantId)
    .then((map) => {
      res.write(JSON.stringify(map));
      res.end();
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

//  get all maps (for testing)
app.get('/restaurant/all', function (req, res) {
  Restaurant.getAll()
    .then((restaurants) => {
      res.write(JSON.stringify(restaurants));
      res.end();
    })
    .catch((err) => {
      console.log('Error occurred:', err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

//  get restaurant geolocator for call to google maps api
app.get('/restaurant/:restaurantId', function (req, res) {
  var restaurantId = req.params.restaurantId;
  console.log(restaurantId);
  Restaurant.getOne(restaurantId)
    .then((restaurant) => {
      res.write(JSON.stringify(restaurant));
      res.end();
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
      res.end();
    });
});

let port = 3002;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

// updateReservation = (booking) => {
//   let query = Reservation.findByIdAndUpdate(
//     booking._id,
//     booking
//   );
//   return query.exec();
// };