CREATE TABLE mapSchema (
  restaurant_id int,
  latitude int,
  longitude int,
  FOREIGN KEY (restaurant_id) REFERENCES restaurantSchema (restaurant_id)
);