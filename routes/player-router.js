const express = require('express');
const { createGame } = require('../modules/game');

const {createPlayer, getPlayers, findPlayer} = require("../modules/players")

const router = express.Router()

router.post('/', (req, res) => {
    let player = req.body.player;
    req.session.player = player
    console.log(`Login Player with ID ${req.session.player.id}`);

    const createdPlayer = createPlayer(player)
    if(createdPlayer)
        res.status(200).send(createdPlayer)
    else
        res.status(400).send("Player Objekt is not valid")
})

router.get('/', (req, res) => {
    res.status(200).send({player: getPlayers()})
})

router.get('/:id', (req,res) => {
    const player = findPlayer(req.params.id)
    if(!player){
        res.status(400).send("Player with given ID was not found")
    }else{
        res.status(200).send({player})
    }
})

module.exports = router;