const fs = require('fs');
const Reservation = require('./Reservation.js');
const Mapper = require('./Mapper.js');
const Restaurant = require('./Restaurant.js');
const faker = require('faker');
const categories = require('../categories.json');

/*
10,000,000 reservations
--> with 1,000,000 restaurants across the US by latitude and longitude
--> with 40 tables and 70 seats and random number of guests between 1-6.
--> created at
--> updated at
sample object: {
  "_id":"5dfaed3c3144ba52b6c2b2b6", (don't need to produce)
  "restaurant_id":99,
  "customer_name":"Reina Botsford III",
  "reservation_time":"2019-12-20T06:43:40.747Z",
  "guests":3,
  "created_at":"2019-12-19T03:23:40.758Z",
  "updated_at":"2019-12-19T03:23:40.758Z",
  "__v":0 (don't need to produce)
}
*/

const dataGenerator = (path) => {

  const ws = fs.createWriteStream(path);
  ws.write(`restaurant_id,customer_name,reservation_time,guests,created_at,updated_at\n`);

  const ws3 = fs.createWriteStream(path);
  ws.write(`restaurant_id,latitude,longitude\n`);

  const RESERVATIONS_TO_CREATE = 10000000;

  //  RESERVATIONS
  //  we're going to use random number for restaurant_id so we don't end up with same
  //    number of reservations in each restaurant
  var res = [];

  for (var i = 0; i < RESERVATIONS_TO_CREATE; i++) {
    res[i] = {};
    res[i].restaurant_id = Math.floor(Math.random() * 1000000) + 1;
    res[i].customer_name = faker.name.findName();
    //  create random time between now and 3 days from now (4320 minutes)
    var minutes = getRandomInteger(1, 4320);
    var reserveTime = new Date();
    reserveTime.setMinutes(reserveTime.getMinutes() + minutes);
    console.log(minutes, reserveTime);
    res[i].reservation_time = reserveTime;
    console.log(res[i].reservation_time);
    res[i].guests = Math.floor(Math.random() * 5) + 1;
  }

  const entry = `${restaurant_id};${customer_name};${reservation_time};{${guests}};${created_at};${updated_at}\n`;

  //need a line here like: ws.write(entry), but I'm stuck on creating a condition...

}

//  clear any existing reservations
Reservation.deleteMany({}, () => {});
//  plug in array
Reservation.create(res, () => {});

// MAPS
const mapGenerator = (path) => {
  const ws2 = fs.createWriteStream(path);
  ws.write(`restaurant_id,seats,tables,reservations_today,created_at,updated_at\n`);

  var maps = '';

  //  randomly create one set of mapping coordinates for each restaurant
  //  within SF or nearby ocean
  for (var i = 0; i < 1000000; i++) {
    //https://www.geodatos.net/en/coordinates/united-states
    var lat = getRandomInteger(47606, 32715); // North South Seat (47.606) - SD (32.715)
    var long = getRandomInteger(74005, 122419) * -1; //  East West  NYC (-74.005) - SF (-122.419)
    maps[i] = {};
    maps[i].restaurant_id = i + 1;
    maps[i].latitude = lat * .001;
    maps[i].longitude = long * .001;

    const entry2 = `${restaurant_id};${latitude};${longitude}\n`;
  }
};

//  RESTAURANT - geolocators can go in here if want to refactor
const restaurantGenerator = (path) => {

  var restaurant = [];

  for (var i = 0; i < 100; i++) {
    restaurant[i] = {};
    restaurant[i].restaurant_id = i + 1;
    restaurant[i].seats = 70;
    restaurant[i].tables = 40;
    restaurant[i].reservations_today = getRandomInteger(0, 200);

    const entry3 = `${restaurant_id};${seats};${tables};{${reservations_today}};${created_at};${updated_at}\n`;
  }

  //  clear current maps
  Restaurant.deleteMany({}, () => {});
  //  plug in the array
  Restaurant.create(restaurant, () => {});

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

dataGenerator('./csv/postgresData.csv');
mapGenerator('./csv/postgresData.csv');
restaurantGenerator('./csv/postgresData.csv');

/*
10,000,000 reservations
--> with 1,000,000 restaurants across the US by latitude and longitude
--> with 40 tables and 70 seats and random number of guests between 1-6.
--> created at
--> updated at
*/

