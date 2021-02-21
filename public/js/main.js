const socket = io('/')

const Constants = {
    MSG_TYPES: {
        JOIN_GAME: 'join_game',
        GAME_INFO: 'game_info',
        GAME_UPDATE: 'game_update',
        GAME_ERROR: 'game_error'
    }
}

playerId = 1
id = 2;

// Join chatroom
socket.emit(Constants.MSG_TYPES.JOIN_GAME, { playerId, id });

// Message from server
socket.on(Constants.MSG_TYPES.GAME_INFO, message => {
  console.log(message);
});

socket.on(Constants.MSG_TYPES.GAME_ERROR, msg => {
  console.log(msg.error)
})

socket.on(Constants.MSG_TYPES.GAME_UPDATE, game => {
  console.log(game)
})