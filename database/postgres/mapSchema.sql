CREATE TABLE mapSchema (
  restaurant_id integer,
  latitude float,
  longitude float,
  FOREIGN KEY (restaurant_id) REFERENCES restaurantSchema (restaurant_id)
);