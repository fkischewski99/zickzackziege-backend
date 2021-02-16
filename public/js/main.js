const socket = io('/')

const Constants = {
    MSG_TYPES: {
        JOIN_GAME: 'join_game',
        GAME_INFO: 'game_info',
        GAME_UPDATE: 'game_update'
    }
}

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