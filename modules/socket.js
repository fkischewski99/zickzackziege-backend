const Constants = require('../shared/constants')
const {findPlayer, playerLeave, getgameplayers} = require('./players')
const {createGame, joinGame} = require('./game')

// An die Route init binden

function socketIO(socket, options){

  if(!socket) {
		throw new Error('SocketIO requires Socket.');
	}

  io = socket

  io.of('/').on('connection', (socket) => {

      socket.on(Constants.MSG_TYPES.JOIN_GAME, ({playerId, id}) => {
          const game = joinGame(playerId, id);
          if(!game){
            socket.emit(Constants.MSG_TYPES.GAME_ERROR, {error: "The reqeusted Game Id doesent exists"})
            return
          }
          socket.join(game.id);
      
          // Welcome current player
          socket.emit(Constants.MSG_TYPES.GAME_INFO, game)
      
          // Broadcast when a player connects
          socket.broadcast
            .to(game.id)
            .emit(
              Constants.MSG_TYPES.GAME_UPDATE,
              game
            );
        });
      
        // Runs when client disconnects
        socket.on('disconnect', () => {
          const player = playerLeave(socket.id);
      
          if (player) {
            io.to(player.game).emit(
              Constants.MSG_TYPES.GAME_UPDATE,
              game
              //`${player.playername} has left the game`
            );
          }
        });
    
    })
  }

module.exports = {
  socketIO
}
