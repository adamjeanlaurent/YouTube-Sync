const mongoose = require('./db');

const Room = new mongoose.Schema({
    roomID: String
});

const RoomModel = mongoose.model('Room', Room);

module.exports = RoomModel;