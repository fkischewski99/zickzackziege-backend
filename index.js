// Externe Module
// Setup basic express server

/*
    DEBUG Module einbinden???
*/

const express = require('express')
const path = require('path')

const config = require('config')

const app = express();

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {socketIO} = require('./modules/socket')

const playerRouter = require('./routes/player-router')


//Bind Port 3000 to Server if no os Port exist
const PORT = process.env.PORT || config.get("PORT")
server.listen(PORT, () => {
    console.log(`ZickZackZiege listens on Port ${PORT}`)
})

//Load index.html on localhost:3000
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/player', playerRouter)

socketIO(io)