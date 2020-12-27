const express = require('express');
const { nanoid } = require('nanoid');
const md5 = require('md5');
const RoomModel = require('../models/room');

const router = express.Router();

router.post('/create/:password', async (req, res, next) => {
    const { password } = req.params;
    const id = nanoid(10).toLowerCase();
    const hashedPassword = md5(password);

    const roomInstance = new RoomModel({
        roomID: id,
        roomPassword: hashedPassword
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

router.get('/exists/:roomID', async (req, res, next) => {
    const { roomID } = req.params;

    try {
        const room = await RoomModel.findOne({roomID : roomID});

        if(room == null) {
            return res.json({exists: false})
        }

        return res.json({exists: true});
    }

    catch(e) {
        return next(e);
    }
});

module.exports = router;