const mongoose = require('./db');

const Room = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    roomPassword: {
        type: String, 
        required: true
    }
});

const RoomModel = mongoose.model('Room', Room);

module.exports = RoomModel;