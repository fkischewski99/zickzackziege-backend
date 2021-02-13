// Externe Module
// Setup basic express server
const express = require('express');
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {playerJoin, findPlayer, playerLeave, getgameplayers} = require('./modules/players')
const formatMessage = require('./modules/messages')
const gamesRouter = require('./routes/game-routes')

const { join } = require('path');
const { joinGame } = require('./modules/game');

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

// An die Route init binden
io.of('/playGame').on('connection', (socket) => {

    socket.on('joinGame', ({playerId, gameId}) => {
        const game = joinGame(playerId, gameId);
        socket.join(game.id);
    
        // Welcome current player
        socket.emit('gameInfo', game);
    
        // Broadcast when a player connects
        socket.broadcast
          .to(game.id)
          .emit(
            'playerJoined',
             findPlayer(playerId)
          );
    
        // Send players and game info
        //io.to(game.id).emit('gameplayers', {
        //  game: player.game,
        //  players: getgameplayers(player.game)
        //});
      });
    
      // Listen for chatMessage
     // socket.on('chatMessage', msg => {
       //const player = getCurrentplayer(socket.id);
    
       //io.to(player.game).emit('message', formatMessage(player.playername, msg));
    // });
    
      // Runs when client disconnects
      socket.on('disconnect', () => {
        const player = playerLeave(socket.id);
    
        if (player) {
          io.to(player.game).emit(
            'message',
            formatMessage(botName,  player.game, `${player.playername} has left the game`)
          );
    
          // Send players and game info
          io.to(player.game).emit('gameplayers', {
            game: player.game,
            players: getgameplayers(player.game)
          });
        }
      });

})

