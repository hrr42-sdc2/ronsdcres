/*
10,000,000 restaurants across the US by latitude and longitude
--> with 40 tables and 70 seats
--> with 1-2 reservations each
--> random number of guests between 1-6
--> created at
--> updated at

sample object for restaurant schema: {
  "_id":"5dfaed3c3144ba52b6c2b2b6", (don't need to produce)
  "restaurant_id":99,
  "customer_name":"Reina Botsford III",
  "reservation_time":"2019-12-20T06:43:40.747Z",
  "guests":3,
  "created_at":"2019-12-19T03:23:40.758Z",
  "updated_at":"2019-12-19T03:23:40.758Z",
  "__v":0 (don't need to produce)
}

1. how to format in csv so it will align with schema plan - seperate csv file for each schema
2. change to 10 million restaurants instead
3. make a 'drain'
4. figure out how to do created_at and updated_at
*/

const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const numberReservations = 20000000;
// const numberReservations = 50;
const numberRestaurants = 10000000;
// const numberRestaurants = 25;
const numberMaps = 10000000;
// const numberMaps = 25;
const writer = csvWriter({
  separator: ';',
  newline: '\n',
  headers: undefined,
  sendHeaders: true,
});

let rando = function (start, stop) {
  return start + Math.round(Math.random() * (stop - start));
};

const minutes = rando(1, 4320);
const reserveTime = new Date();
reserveTime.setMinutes(reserveTime.getMinutes() + minutes);

//reservations
let reservationMaker = function () {
  const reservationObj = {};
  reservationObj.restaurant_id = rando(1, numberRestaurants);
  reservationObj.customer_name = faker.name.findName();
  reservationObj.reservation_time = reserveTime.toISOString();
  reservationObj.guests = rando(1, 5);
  // reservationObj.created_at = reserveTime.toISOString();
  // reservationObj.updated_at = reserveTime.toISOString();
  return reservationObj;
};

let i = numberReservations;
writer.pipe(fs.createWriteStream(`${__dirname}/postgresData1.csv`));

let reservationGenerator = function () {
  let ok = true;
  do {
    i -= 1;
    if (i === 0) {
      writer.write(reservationMaker());
      console.log('reservations suc-seeded!!');
      writer.end();
    } else {
      ok = writer.write(reservationMaker());
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', reservationGenerator);
  }
};
reservationGenerator();

// // MAPS
// let mapMaker = function () {
//   const mapObj = {};
//   mapObj.restaurant_id = rando(1, numberRestaurants);
//   mapObj.latitude = rando(47606, 32715) * .001; // North South Seat (47.606) - SD (32.715);
//   mapObj.longitude = rando(74005, 122419) * -.001; //  East West  NYC (-74.005) - SF (-122.419);
//   return mapObj;
// };

// let j = numberMaps;
// writer.pipe(fs.createWriteStream(`${__dirname}/postgresData2.csv`));

// let mapGenerator = function () {
//   let ok = true;
//   do {
//     j -= 1;
//     if (j === 0) {
//       writer.write(mapMaker());
//       console.log('maps suc-seeded!!');
//       writer.end();
//     } else {
//       ok = writer.write(mapMaker());
//     }
//   } while (j > 0 && ok);
//   if (j > 0) {
//     writer.once('drain', mapGenerator);
//   }
// };
// mapGenerator();

// //  RESTAURANT - geolocators can go in here if want to refactor
// let restaurantMaker = function () {
//   const restaurant = {};
//   restaurant.restaurant_id = rando(1, numberRestaurants);
//   restaurant.seats = 70;
//   restaurant.tables = 40;
//   restaurant.reservation_time = reserveTime;
//   // restaurant.created_at = /* fix this */;
//   // restaurant.updated_at = /* fix this */;
//   return restaurant;
// };

// let k = numberRestaurants;
// writer.pipe(fs.createWriteStream(`${__dirname}/postgresData3.csv`));

// let restaurantGenerator = function () {
//   let ok = true;
//   do {
//     k -= 1;
//     if (k === 0) {
//       writer.write(restaurantMaker());
//       console.log('Restaurants suc-seeded!!');
//       writer.end();
//     } else {
//       ok = writer.write(restaurantMaker());
//     }
//   } while (k > 0 && ok);
//   if (k > 0) {
//     writer.once('drain', restaurantGenerator);
//   }
// };
// restaurantGenerator();






/*
10,000,000 reservations
--> with 1,000,000 restaurants across the US by latitude and longitude
--> with 40 tables and 70 seats and random number of guests between 1-6.
--> created at
--> updated at
*/



// const ws = fs.createWriteStream(path);
//   ws.write(`restaurant_id,customer_name,reservation_time,guests,created_at,updated_at\n`);

//   const RESERVATIONS_TO_CREATE = 10000000;

//   //  RESERVATIONS
//   //  we're going to use random number for restaurant_id so we don't end up with same
//   //    number of reservations in each restaurant
//   var res = [];

//   for (var i = 0; i < RESERVATIONS_TO_CREATE; i++) {
//     res[i] = {};
//     res[i].restaurant_id = rando(1, 10000000);
//     res[i].customer_name = faker.name.findName();
//     //  create random time between now and 3 days from now (4320 minutes)
//     var minutes = getRandomInteger(1, 4320);
//     var reserveTime = new Date();
//     reserveTime.setMinutes(reserveTime.getMinutes() + minutes);
//     console.log(minutes, reserveTime);
//     res[i].reservation_time = reserveTime;
//     console.log(res[i].reservation_time);
//     res[i].guests = rando(1, 5);
//   }

//   const entry = `${restaurant_id};${customer_name};${reservation_time};{${guests}};${created_at};${updated_at}\n`;

//   //need a line here like: ws.write(entry), but I'm stuck on creating a condition...

// };

// const mapGenerator = (path) => {

//   const ws2 = fs.createWriteStream(path);
//   ws.write(`restaurant_id,latitude,longitude\n`);

//   var maps = [];

//   //  randomly create one set of mapping coordinates for each restaurant
//   //  within SF or nearby ocean
//   for (var i = 0; i < 1000000; i++) {
//     //https://www.geodatos.net/en/coordinates/united-states
//     var lat = getRandomInteger(47606, 32715); // North South Seat (47.606) - SD (32.715)
//     var long = getRandomInteger(74005, 122419) * -1; //  East West  NYC (-74.005) - SF (-122.419)
//     maps[i] = {};
//     maps[i].restaurant_id = i + 1;
//     maps[i].latitude = lat * .001;
//     maps[i].longitude = long * .001;

//     const entry2 = `${restaurant_id};${latitude};${longitude}\n`;
//   }
// };

// const restaurantGenerator = (path) => {

//   const ws3 = fs.createWriteStream(path);
//   ws.write(`restaurant_id,seats,tables,reservations_today,created_at,updated_at\n`);

//   var restaurant = [];

//   for (var i = 0; i < 1000000; i++) {
//     restaurant[i] = {};
//     restaurant[i].restaurant_id = i + 1;
//     restaurant[i].seats = 70;
//     restaurant[i].tables = 40;
//     restaurant[i].reservations_today = rando(1, 200);

//     const entry3 = `${restaurant_id};${seats};${tables};{${reservations_today}};${created_at};${updated_at}\n`;
//   }

//   //  clear current maps
//   Restaurant.deleteMany({}, () => {});
//   //  plug in the array
//   Restaurant.create(restaurant, () => {});
// };


// reservationGenerator('./csv/postgresData.csv');
// mapGenerator('./csv/postgresData.csv');
// restaurantGenerator('./csv/postgresData.csv');