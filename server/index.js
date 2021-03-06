//  API server
require('newrelic');

const express = require('express');
let app = express();
const bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');

// const mongoose = require('../database/connect.js');

const Reservation = require('../database/Reservation.js');
const Mapper = require('../database/Mapper.js');
const Restaurant = require('../database/Restaurant.js');

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());

//  get all reservations (for testing)
app.get('/reservation/all', function (req, res) {
  queries.getRestaurantById()
    .then((reservations) => {
      res.send(JSON.stringify(reservations));
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(500).send(new Error(err));
    });
});

//  check if reservation can be accepted and add to the database if so
app.post('/reservation', function (req, res) {
  //  post if you can; return success
  //  if post not allowed, return error message
  //  errors can be: username already has a reservation,
  //    reservation overlaps too many (too many tables used)
  //console.log('Posting reservation: ', req.body);
  var booking = req.body;
  //console.log('This is booking from server:', booking);
  Reservation.make(booking)
    .then((notification) => {
      //console.log('Notification from server: ', notification);
      res.send(notification);
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
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
  //console.log(booking);
  //const time = req.params.restaurant_time;
  // res.send(booking)
  Reservation.updateReservation(booking)
    .then((notification) => {
      // console.log(notification);
      // console.log(booking);
      res.send(JSON.stringify(notification));
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
    });
  // res.send("Updated!");
});

//!! END OF PUT REQUEST ADDED BY RON

//!! RON'S ADDITION FOR THE DELETE REQUEST TO UPDATE THE RESERVATION
app.delete('/reservation', function (req, res) {
  const booking = req.body;
  //console.log(booking);
  //const time = req.params.restaurant_time;
  // res.send(booking)
  Reservation.deleteReservation(booking)
    .then((notification) => {
      // console.log(notification);
      // console.log(booking);
      res.send(JSON.stringify(notification));
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
    });
  // res.send("Updated!");
});

//!! END OF DELETE REQUEST ADDED BY RON

//  get all maps (for testing)
app.get('/mapper/all', function (req, res) {
  Mapper.getAll()
    .then((maps) => {
      res.send(JSON.stringify(maps));
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
    });
});

//  get restaurant geolocator for call to google maps api
//jeff suggests I work on this one.
app.get('/mapper/:restaurantId', function (req, res) {
  var restaurantId = req.params.restaurantId;
  Mapper.getOne(restaurantId, function(err, result) {
    if (err) {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
    } else {
      //console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});


//  get all maps (for testing)
app.get('/restaurant/all', function (req, res) {
  Restaurant.getAll()
    .then((restaurants) => {
      res.send(JSON.stringify(restaurants));
    })
    .catch((err) => {
      console.log('Error occurred:', err);
      res.status(500).send(new Error(err));
    });
});

//  get restaurant geolocator for call to google maps api
app.get('/restaurant/:restaurantId', function (req, res) {
  var restaurantId = req.params.restaurantId;
  //console.log(restaurantId);
  Restaurant.getOne(restaurantId)
    .then((restaurant) => {
      res.send(JSON.stringify(restaurant));
    })
    .catch((err) => {
      console.log('Error occurred: ', err);
      res.status(500).send(new Error(err));
    });
});

let port = 3002;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});