const mongoose = require('./connect.js');
mongoose.Promise = global.Promise;

let restaurantSchema = mongoose.Schema({
  restaurant_id: Number,
  seats: Number,
  tables: Number,
  reservations_today: Number,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);

var getAll = () => {
  return new Promise((resolve, reject) => {
    Restaurant.find()
      .exec((err, restaurants) => {
        resolve(restaurants);
      });
  });
};

var getOne = (restaurantId) => {
  return new Promise((resolve, reject) => {
    Restaurant.find({ restaurant_id: restaurantId })
      .exec((err, restaurant) => {
        resolve(restaurant);
      });
  });
};

var incrementReservations = (restaurantId) => {
  return new Promise((resolve, reject) => {
    Restaurant.find({ restaurant_id: restaurantId })
      .exec((err, map) => {
        resolve(restaurant);   //  need to add 1 to reservations_today
      });
  });
};

module.exports = Restaurant;
module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.incrementReservations = incrementReservations;