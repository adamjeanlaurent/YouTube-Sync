const express = require('express');
const { nanoid } = require('nanoid');
const md5 = require('md5');
const RoomModel = require('../models/room');

const router = express.Router();

const compareRoomPassword = async(passwordPlainText, roomID) => {
    try {
        const room = await RoomModel.findOne({roomID : roomID});

        if(room == null) {
            return false;
        }

        else {
            const hashedPasswordFromDB = room.roomPassword;
            const hashedInputPassword = md5(passwordPlainText);

            if(hashedInputPassword == hashedPasswordFromDB) {
                return true;
            }

            return false;
        }
    }

    catch {

    }
};


router.get('/auth/:password', async (req, res, next) => {

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