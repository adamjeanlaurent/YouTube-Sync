const { render } = require('ejs');
const express = require('express');
const fetch = require('node-fetch');
const RoomModel = require('../models/room');

const router = express.Router();

const roomExists =  async (roomID) => {
    let renderParams = {
        roomID: roomID,
        roomExists: false,
        error: ""
    };
    
    try {
        const room = await RoomModel.findOne({roomID : roomID});

        if(room == null) {
            renderParams.roomExists = false;
        }

        else {
            renderParams.roomExists = true;
        }
    }

    catch(e) {
        renderParams.error = "Internal Error";
    }

    return renderParams;
};

router.get('/join/:roomID', async (req, res, next) => {
    const { roomID } = req.params;

    const renderParams = await roomExists(roomID);

    return res.render('join', renderParams);
});

module.exports = router;    