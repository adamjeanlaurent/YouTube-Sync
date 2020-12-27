const express = require('express');
const { nanoid } = require('nanoid');
const RoomModel = require('../models/room');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const id = nanoid(10).toLowerCase();

    const roomInstance = new RoomModel({
        roomID: id
    });

    try {
        await roomInstance.save();
    }

    catch(e) {
        return next(e);
    }
    
    return res.json({
        id: id 
    });
});

module.exports = router;