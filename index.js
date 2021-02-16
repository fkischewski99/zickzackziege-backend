// Externe Module
// Setup basic express server
const express = require('express');
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const gamesRouter = require('./routes/game-routes')

//Bind Port 3000 to Server if no os Port exists
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`ZickZackZiege listens on Port ${PORT}`)
})

//Name for Server Messages
const botName = 'Server';

//Load index.html on localhost:3000
app.use(express.static(path.join(__dirname, 'public')));
app.use('/player', gamesRouter)
