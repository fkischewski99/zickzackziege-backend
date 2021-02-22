const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let playerId = req.body.playerId;
    let playerName = req.body.playerName;

    req.session.playerId = playerId;
    req.session.playerName = playerName;

    console.log(`Login Player with ID ${req.session.playerId}`);

    res.status(200).send('OK');
})

module.exports = router