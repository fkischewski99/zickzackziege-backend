// Externe Module
// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const initRouter = require('./routes/init-router')

// Router einbinden
app.use("/init", initRouter)


const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`ZickZackZiege listens on Port ${PORT}`)
})

// An die Route init binden
io.of('/init').on('connection', (socket) => {

    // Event init abfangen
    socket.on('init', (userId) => {
        console.log(`User ${userId} starts a game.`);
        socket.userId = userId;
        let gameId = parseInt(Math.random() * 10);
        socket.emit('init successful', {
            gameId: gameId
        });
    });

})

