const express = require('express');
const { nanoid } = require('nanoid');
const RoomModel = require('../models/room');

const router = express.Router();

router.post('/', async (req, res) => {
    const id = nanoid(10).toLowerCase();

    const roomInstance = new RoomModel({
        roomID: id
    });

    roomInstance.save();

    return res.json({
        id: id 
    });
});

module.exports = router;