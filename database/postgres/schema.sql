CREATE TABLE mapSchema (
  restaurant_id int PRIMARY KEY,
  latitude int,
  longitude int
);

CREATE TABLE restaurantSchema (
  restaurant_id int PRIMARY KEY,
  seats int,
  tables int,
  reservations_today int,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE reservationSchema (
  restaurant_id int PRIMARY KEY,
  customer_name text,
  reservation_time Date,
  guests int,
  created_at DATETIME,
  update_at DATETIME
);

/* STILL NEED TO CREATE THE HAS MANY, BELONGS TO PART https://stackoverflow.com/questions/9789736/how-to-implement-a-many-to-many-relationship-in-postgresql */