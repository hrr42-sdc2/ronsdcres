const client = require('./connect');
//mongoose.Promise = global.Promise;

// let mapperSchema = mongoose.Schema({
//   restaurant_id: Number,
//   latitude: Number,
//   longitude: Number
// });

//let Mapper = mongoose.model('Mapper', mapperSchema); //not sure about this line

//! change this:
// var getAll = () => {
//   let query = Mapper.find({ });
//   return query.exec();
// };

//! changed getAll to this
var getAll = function () {
  let Maps = parseInt(restaurant_id, 10);
  client.query('SELECT * FROM mapSchema;', [Maps])
    .then((restaurants) => {
      console.log('****Restaurants from getAll');
      return restaurants;
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
};

//! change this:
//mongo code
// var getOne = (restaurantId) => {
//   let query = Mapper.find({ restaurant_id: restaurantId });
//   return query.exec();
// };

//! changed getOne to this:
var getOne = function (restaurantId, callback) {
  let Map = parseInt(restaurantId, 10);
  client.query('SELECT * FROM mapSchema WHERE restaurant_id = $1;', [Map])
    .then((map) => {
      //console.log('Notification from getOne***', map);
      callback(null, map);
    })
    .catch((err) => {
      console.log('Error: ', err);
      callback(err);
    });
};

// module.exports = Mapper; //not sure about this line
module.exports.getAll = getAll;
module.exports.getOne = getOne;