const Constants = require('../shared/constants')
const {findPlayer, playerLeave, getgameplayers} = require('./players')
const {createGame, joinGame} = require('./game')

// An die Route init binden

function socketIO(socket, options){

  if(!socket) {
		throw new Error('SocketIO requires Socket.');
	}

  io = socket

  io.on('connection', (socket) => {

      socket.on(Constants.MSG_TYPES.CREATE_GAME, async ({numberOfPlayers}) => {
          console.log('Neues Spiel erstellen.');
          const game = await createGame(numberOfPlayers);
          socket.join(game.id)
          socket.emit(Constants.MSG_TYPES.GAME_INFO_CREATED, game)
      })

      socket.on(Constants.MSG_TYPES.JOIN_GAME, (gameId) => {
          console.log(`Spiel mit der ID ${gameId} beitreten`);
          // PlayerId ist in der Session hinterlegt.
          let playerId = socket.request.session.player.id;

          // Der Spieler mit der ID playerId tritt dem Spiel gameId bei.
          const game = joinGame(playerId, gameId);

          if (!game) {
              console.log('Spiel nicht gefunden')
              return
          }

          socket.join(game.id);
          // Welcome current player
          socket.emit(Constants.MSG_TYPES.GAME_INFO_JOINED, game);
          /*
          // Broadcast when a player connects
          socket.broadcast
            .to(game.id)
            .emit(
              Constants.MSG_TYPES.GAME_UPDATE,
              findPlayer(playerId)
            );*/
        });
      
        /* Runs when client disconnects
        socket.on('disconnect', () => {
          const player = playerLeave(socket.id);
      
          if (player) {
            io.to(player.game).emit(
              Constants.MSG_TYPES.GAME_UPDATE,
              `${player.playername} has left the game`
            );
          }
        });*/
    
    })
  }

module.exports = {
  socketIO
}
