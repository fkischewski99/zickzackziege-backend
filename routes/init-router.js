const express = require('express')
const router = express.Router();

router.post('/', (req, res) => {
    const players = req.body.players;
    res.status(200).send("1234")
})

module.exports = router;