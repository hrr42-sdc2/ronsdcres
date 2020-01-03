CREATE TABLE mapSchema (
  restaurant_id int,
  latitude int,
  longitude int,
  FOREIGN KEY (restaurant_id)
);

CREATE TABLE restaurantSchema (
  restaurant_id int PRIMARY KEY,
  seats int,
  tables int,
  reservations_today int,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reservationSchema (
  restaurant_id int,
  customer_name text,
  reservation_time Date,
  guests int,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  update_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (restaurant_id)
);

/* STILL NEED TO CREATE THE HAS MANY, BELONGS TO PART https://stackoverflow.com/questions/9789736/how-to-implement-a-many-to-many-relationship-in-postgresql */