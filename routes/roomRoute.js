const express = require('express');
const { nanoid } = require('nanoid');
const md5 = require('md5');
const RoomModel = require('../models/room');
require('dotenv').config();

const router = express.Router();

const compareRoomPassword = async(passwordPlainText, roomID) => {
    const room = await RoomModel.findOne({roomID: roomID});

    if(room == null) {
        return null;
    }

    else {
        const hashedPasswordFromDB = room.roomPassword;
        const hashedInputPassword = md5(passwordPlainText);

        if(hashedInputPassword == hashedPasswordFromDB) {
            return room;
        }

        return null;
    }
};

router.get('/auth/:password/:roomID', async (req, res, next) => {
    const { password, roomID } = req.params;

    if(password.length == 0 || roomID.length == 0) {
        return res.json({error: 'required, non-empty roomID and password.'});
    }

    try {
        const roomInfo = compareRoomPassword(password, roomID);
        
        if(roomInfo === null) {
            return res.json({error: 'invalid password.'});
        }

        const accessToken = jwt.sign({roomID: roomInfo.roomID}, process.env.ACCESS_TOKEN_SECRET);
        return res.json({accessToken: accessToken});
    }

    catch(e) {
        return next(e);
    }
});

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

module.exports = router;