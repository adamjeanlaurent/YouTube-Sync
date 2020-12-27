const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

try {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

catch(e) {
    console.log(e);
}

module.exports = mongoose;