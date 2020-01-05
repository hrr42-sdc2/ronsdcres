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

// MAPS
let mapMaker = function () {
  const mapObj = {};
  mapObj.restaurant_id = rando(1, numberRestaurants);
  mapObj.latitude = rando(47606, 32715) * .001; // North South Seat (47.606) - SD (32.715);
  mapObj.longitude = rando(74005, 122419) * -.001; //  East West  NYC (-74.005) - SF (-122.419);
  return mapObj;
};

let j = numberMaps;
writer.pipe(fs.createWriteStream(`${__dirname}/postgresData2.csv`));

let mapGenerator = function () {
  let ok = true;
  do {
    j -= 1;
    if (j === 0) {
      writer.write(mapMaker());
      console.log('maps suc-seeded!!');
      writer.end();
    } else {
      ok = writer.write(mapMaker());
    }
  } while (j > 0 && ok);
  if (j > 0) {
    writer.once('drain', mapGenerator);
  }
};
mapGenerator();