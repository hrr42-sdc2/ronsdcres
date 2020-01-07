const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
// const numberReservations = 20000000;
// const numberReservations = 50;
const numberRestaurants = 10000001;
// const numberRestaurants = 25;
// const numberMaps = 10000000;
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

//  RESTAURANT - geolocators can go in here if want to refactor
let restaurantMaker = function () {
  const restaurant = {};
  restaurant.restaurant_id = rando(1, numberRestaurants);
  restaurant.seats = 70;
  restaurant.num_table = 40;
  return restaurant;
};

let k = numberRestaurants;
writer.pipe(fs.createWriteStream(`${__dirname}/postgresData3.csv`));

let restaurantGenerator = function () {
  let ok = true;
  do {
    k -= 1;
    if (k === 0) {
      //writer.write(restaurantMaker());
      console.log('Restaurants suc-seeded!!');
      writer.end();
    } else {
      ok = writer.write({
        restaurant_id: k,
        seats: 70,
        num_table: 40,
      });
    }
  } while (k > 0 && ok);
  if (k > 0) {
    writer.once('drain', restaurantGenerator);
  }
};
restaurantGenerator();