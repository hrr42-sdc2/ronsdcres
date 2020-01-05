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