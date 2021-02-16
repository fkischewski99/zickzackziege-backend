const socket = io('/playGame');
const Constants = require('../../shared/constants')

playerId = 1
gameId = 'new';

// Join chatroom
socket.emit(Constants.MSG_TYPES.JOIN_GAME, { playerId, gameId });

// Message from server
socket.on(Constants.MSG_TYPES.GAME_INFO, message => {
  console.log(message);
});

socket.on(Constants.MSG_TYPES.GAME_UPDATE, game => {
  console.log(game)
})