const mongoose = require('./connect')
mongoose.Promise = global.Promise;

let mapperSchema = mongoose.Schema({
  restaurant_id: Number,
  latitude: Number,
  longitude: Number
});

let Mapper = mongoose.model('Mapper', mapperSchema);

var getAll = () => {
  let query = Mapper.find({ });
  return query.exec();
};

var getOne = (restaurantId) => {
  let query = Mapper.find({ restaurant_id: restaurantId });
  return query.exec();
};

module.exports = Mapper;
module.exports.getAll = getAll;
module.exports.getOne = getOne;