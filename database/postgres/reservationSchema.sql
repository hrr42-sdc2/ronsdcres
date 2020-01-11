CREATE TABLE reservationSchema (
  restaurant_id integer,
  customer_name text,
  reservation_time Date,
  guests integer
  -- created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  -- update_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (customer_name),
  FOREIGN KEY (restaurant_id) REFERENCES restaurantSchema (restaurant_id)
  );