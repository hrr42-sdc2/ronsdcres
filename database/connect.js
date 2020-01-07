// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true, useUnifiedTopology: true 
//});

// module.exports = mongoose;

require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
client.connect();

module.exports = client;