// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true, useUnifiedTopology: true 
//});

// module.exports = mongoose;

require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});
client
.connect()
.then(() => console.log('connected'))
.catch(err => console.error('Error in connection to pg', err.stack))

module.exports = client;