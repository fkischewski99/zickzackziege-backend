const { response } = require('express');
const express = require('express')
const router = express.Router();

router.post('/', (req, res) => {
    const players = req.body.players;
    res.status(200).send("1234")
})

router.get('/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    res.status(200).send(`Game ${gameId} exists`)
})

module.exports = router;