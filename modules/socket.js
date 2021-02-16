const io = require('socket.io')(server);
const Constants = require('../shared/constants')

// An die Route init binden
io.of('/playGame').on('connection', (socket) => {

    socket.on(Constants.MSG_TYPES.JOIN_GAME, ({playerId, gameId}) => {
        const game = joinGame(playerId, gameId);
        socket.join(game.id);
    
        // Welcome current player
        socket.emit(Constants.MSG_TYPES.GAME_INFO, game);
    
        // Broadcast when a player connects
        socket.broadcast
          .to(game.id)
          .emit(
             Constants.MSG_TYPES.GAME_UPDATE,
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
