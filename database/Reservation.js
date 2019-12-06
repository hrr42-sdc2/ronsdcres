const mongoose = require('./connect.js');
mongoose.Promise = global.Promise;

let reservationSchema = mongoose.Schema({
  restaurant_id: Number,
  customer_name: String,
  reservation_time: Date,
  guests: Number,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

let Reservation = mongoose.model('Reservation', reservationSchema);

var getAll = () => {
  return new Promise((resolve, reject) => {
    Reservation.find()
      .exec((err, reservations) => {
        resolve(reservations);
      });
  });
};

var getByDate = (restId, date) => {
  return new Promise((resolve, reject) => {  // this won't work
    //  create search-between dates for the date sought
    var workDate = new Date(date);
    var fromDate = new Date(workDate.getFullYear(), workDate.getMonth(), workDate.getDate());
    var thruDate = new Date(fromDate);
    console.log('fromDate: ', fromDate, 'thruDate: ', thruDate);

    thruDate.setDate(thruDate.getDate()+1);
    console.log('fromDate: ', fromDate, 'thruDate: ', thruDate);
    //  for now we're going to get everything for the restaurant,
    //  because date stuff is acting ridiculous:
    //  reservation_time: { $gte: fromDate, $lt: thruDate }}) not getting anything
    Reservation.find({ restaurant_id: restId })
      .exec((err, reservations) => {
        resolve(reservations);
      });
  });
};

// function to make a reservation.  or not.
var make = (booking) => {
  return new Promise((resolve, reject) => {
    Reservation.find({ restaurant_id: booking.restId })
      .exec((err, reservations) => {
        console.log(reservations);
        const AVAIL_TABLES = 15;
        var nameMatch = false;
        var overlaps = [];
        var currResStart = time;
        var currResEnd = new Date(currResStart);
        //  a reservation is two hours long
        currResEnd.setHours(currResEnd.getHours() + 2);
        //  a real restaurant would check that start AND end are within open hours
        for (var i = 0; i < reservations.length; i++) {
          var exResStart = reservations[i].reservation_time;
          var exResEnd = new Date(exResStart);
          //  every reservation is for two hours
          exResEnd.setHours(exResEnd.getHours() + 2);
          //  overlap = new reservation start OR end is between existing reservation start AND end
          if ((currResStart > exResStart && currResStart < exResEnd) ||
              (currResEnd > exResStart && currResEnd < exResEnd)) {
            overlaps.push(reservations[i]);
            //  HEY!  Does the name match?  If so, decline reservation.
            if (name !== '' && name === reservations[i].name) {
              nameMatch = true;
              break;
            }
          }
        }
        if (nameMatch || overlaps.length >= AVAIL_TABLES) {
          //  return declined reason
        } else {
          //  add reservation to the database
          //  also, need to add 1 to reservations to date in Restaurant
          //  do we do that here or at the server?
        }
        resolve(reservations);
      });
  });
  //  1. get all reservations for this restaurant, date.  Not very efficient.
  //  2. pare down to overlapping dateTimes
  //  3. check if <name> has an overlapping dateTime.  If so, decline
  //  4. if count of existing reservation dateTime overlaps (array created in step 2) is already at
  //       max, decline the new reservation
  //  5. else, add the reservation to the database!
  getByDate(booking.restId, booking.time)
  .then((reservations) => {
    console.log(reservations);
    const AVAIL_TABLES = 15;
    var nameMatch = false;
    var overlaps = [];
    var currResStart = time;
    var currResEnd = new Date(currResStart);
    //  a reservation is two hours long
    currResEnd.setHours(currResEnd.getHours() + 2);
    //  a real restaurant would check that start AND end are within open hours
    for (var i = 0; i < reservations.length; i++) {
      var exResStart = reservations[i].reservation_time;
      var exResEnd = new Date(exResStart);
      //  every reservation is for two hours
      exResEnd.setHours(exResEnd.getHours() + 2);
      //  overlap = new reservation start OR end is between existing reservation start AND end
      if ((currResStart > exResStart && currResStart < exResEnd) ||
          (currResEnd > exResStart && currResEnd < exResEnd)) {
        overlaps.push(reservations[i]);
        //  HEY!  Does the name match?  If so, decline reservation.
        if (name !== '' && name === reservations[i].name) {
          nameMatch = true;
          break;
        }
      }
    }
    if (nameMatch || overlaps.length >= AVAIL_TABLES) {
      //  return declined reason
    } else {
      //  add reservation to the database
      //  also, need to add 1 to reservations to date in Restaurant
      //  do we do that here or at the server?
    }
  })
  .catch((err) => {
    //console.log('Error:', err);
    //res.end();
  });
};

module.exports = Reservation;
module.exports.getAll = getAll;
module.exports.getByDate = getByDate;
module.exports.make = make;
