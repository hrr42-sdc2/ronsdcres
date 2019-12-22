const mongoose = require('./connect.js');
mongoose.Promise = global.Promise;

let reservationSchema = mongoose.Schema({
  //reservation_id: Number,
  restaurant_id: Number,
  customer_name: String,
  reservation_time: Date,
  guests: Number,
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

let Reservation = mongoose.model('Reservation', reservationSchema);

var read = () => {
  let query = Reservation.find({});
  return query.exec();
};

//!! RON MADE THIS CHANGE -
//for loop that generates the RESERVATION ID

var createReservationId = () => {
  const reservationId = [];
  for (let i = 1; i <= 10000000; i++) {
    reservationId.push({
      reservationId: i
    });
  }
  return reservationId;
};

// createReservationId();
//!! END OF THE CHANGE ADDED TO GENERATE RESERVATION ID

var getByDate = (restId, date) => {
  //  refactor when have time
  return new Promise((resolve, reject) => {
    //  create search-between dates for the date sought
    var workDate = new Date(date);
    var fromDate = new Date(workDate.getFullYear(), workDate.getMonth(), workDate.getDate());
    var thruDate = new Date(fromDate);
    thruDate.setDate(thruDate.getDate() + 1);
    Reservation.find({
        restaurant_id: restId
      })
      .where('reservation_time').gte(fromDate).lt(thruDate)
      .exec((err, reservations) => {
        resolve(reservations);
      });
  });
};

// function to make a reservation.  or not.
//booking.reservation_id
var make = (booking) => {
  //  refactor when have time
  return new Promise((resolve, reject) => {
    getByDate(booking.restId, booking.time)
      .then((reservations) => {
        // process the booking
        const AVAIL_TABLES = 15;
        var nameMatch = false;
        var overlaps = [];
        console.log('booking: ', booking);
        var currResStart = new Date(booking.time);
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
          if ((currResStart >= exResStart && currResStart <= exResEnd) ||
            (currResEnd >= exResStart && currResEnd <= exResEnd)) {
            overlaps.push(reservations[i]);
            //  Does the name match?  If so, decline "you're alread here"
            if (booking.name !== '' && booking.name === reservations[i].customer_name) {
              nameMatch = true;
              break;
            }
          }
        }
        //  it works!
        var notification = '';
        if (nameMatch) {
          notification = 'Sorry, you already have a booking at this time.  Please make another selection.';
        } else if (overlaps.length >= AVAIL_TABLES) {
          nofitication = 'Sorry, there are no bookings available on this date and time.  Please make another selection.';
        } else {
          //  add reservation to the database
          notification = 'Your reservation has been successfully booked!';
          addReservation(booking);
        }

        resolve(notification)
      });
  });
};

//Ron's crud update: here is were I'm going to insert a put/update request to update/change a reservation

addReservation = (booking) => {
  var res = new Reservation({
    reservation_id: booking.reservId,
    restaurant_id: booking.restId,
    customer_name: booking.name,
    reservation_time: booking.time,
    guests: booking.guests
  });

  // save model to database
  res.save(function (err, booking) {
    if (err) return console.error(err);
  });
};

//!! RON'S ADDITION FOR THE PUT REQUEST TO UPDATE THE RESERVATION
//format is: findByIdAndUpdate(id, {update}, callback)
updateReservation = (booking, callback) => {
  //console.log("this is the booking:", booking);
  console.log(booking._id);
  let query = Reservation.findByIdAndUpdate(
    booking._id,
    { guests: booking.guests },
    function(err, result) {
      if (err) {
        return err;
      } else {
        return result;
      }
    }
  );
  return query.exec();
};

//!! END OF THE CHANGE FOR THE PUT REQUEST

//!! RON'S ADDITION FOR THE DELETE REQUEST TO UPDATE THE RESERVATION
//format is: findByIdAndUpdate(id, {update}, callback)
deleteReservation = (booking) => {
  //console.log("this is the booking:", booking);
  console.log(booking._id);
  let query = Reservation.findByIdAndDelete(
    booking._id
    // function(err, result) {
    //   if (err) {
    //     return err;
    //   } else {
    //     return result;
    //   }
    // }
  );
  return query.exec();
};

//!! END OF THE CHANGE FOR THE DELETE REQUEST

module.exports = Reservation;
module.exports.read = read;
module.exports.getByDate = getByDate;
module.exports.make = make;
module.exports.updateReservation = updateReservation;