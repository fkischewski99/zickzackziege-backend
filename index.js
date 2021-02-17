// Externe Module
// Setup basic express server
const express = require('express')
const path = require('path')

const config = require('config')

const app = express();

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {socketIO} = require('./modules/socket')

const gamesRouter = require('./routes/game-router')

//Bind Port 3000 to Server if no os Port exist
server.listen(config.get("PORT"), () => {
    console.log(`ZickZackZiege listens on Port ${config.get("PORT")}`)
})

//Load index.html on localhost:3000
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/player', gamesRouter)

socketIO(io)