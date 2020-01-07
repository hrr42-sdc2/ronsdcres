const client = require('./connect');
// mongoose.Promise = global.Promise;

// let restaurantSchema = mongoose.Schema({
//   restaurant_id: Number,
//   seats: Number,
//   tables: Number,
//   reservations_today: Number,
//   created_at: { type: Date, required: true, default: Date.now },
//   updated_at: { type: Date, required: true, default: Date.now }
// });

// let Restaurant = mongoose.model('Restaurant', restaurantSchema); //not sure about this line

//! change this:
//mongo code
// var getAll = () => {
//   let query = Restaurant.find({ });
//   return query.exec();
// };

//! changed getAll to this:
var getAll = function () {
  const Restaurants = parseInt(restaurant_id, 10);
  client.query('SELECT * FROM restaurantSchema;', [Restaurants], (error, results) => {
    if (error) {
      throw error;
    }
    callback(results.rows);
  });
};

//! change this:
// mongo code
// let getOne = function (restaurantId, callback) {
//   let query = Restaurant.find({ restaurant_id: restaurantId });
//   return query.exec();
// };

//! changed getOne to this:
let getOne = function (restaurantId, callback) {
  const Restaurant = parseInt(restaurant_id, 10);
  client.query('SELECT * FROM restaurantSchema WHERE restaurantId = restaurant_id;', [Restaurant], (error, results) => {
    if (error) {
      throw error;
    }
    callback(results.rows);
  });
};

//! this seems to not be used at all
var incrementReservations = (restaurantId) => {
  //  this is unfinished
  return new Promise((resolve, reject) => {
    Restaurant.find({ restaurant_id: restaurantId })
      .exec((err, map) => {
        resolve(restaurant);   //  need to add 1 to reservations_today
      });
  });
};

module.exports = Restaurant; //not sure about this line
module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.incrementReservations = incrementReservations;