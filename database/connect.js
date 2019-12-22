const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;