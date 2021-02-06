const { response } = require('express');
const express = require('express')
const router = express.Router();

router.post('/', (req, res) => {
    const players = req.body.players;
    res.status(200).send("1234")
})
/*
router.get('/:gameid', (req,res) =>{
    console.log("getblabal")
    const reqParam = req.params('gameid');
    req.status(200).send(`Game ${reqParam} exists`)
})
*/

router.all('/', (req, res) => {
    console.log('____')
    res.send('A')
})

module.exports = router;