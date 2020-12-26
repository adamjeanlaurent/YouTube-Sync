const express = require('express');
const uniqid = require('uniqid');

const router = express.Router();

router.post('/', async (req, res) => {
    return res.json({
        id: uniqid()
    });
});

module.exports = router;