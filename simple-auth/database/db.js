const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/env.js');

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));