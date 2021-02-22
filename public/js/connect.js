const socket = io('/')
const Constants = {
    MSG_TYPES: {
        CREATE_GAME: 'create_game',
        JOIN_GAME: 'join_game',
        GAME_INFO: 'game_info',
        GAME_UPDATE: 'game_update'
    }
}

window.onload = () => {
    let numberPlayers = document.getElementById('numberPlayers')
    let gameId = document.getElementById('gameId')
    let createBtn = document.getElementById('createBtn')
    let joinBtn = document.getElementById('joinBtn')

    createBtn.onclick = () => {
        console.log('Neues Spiel erstellen.')
        socket.emit(Constants.MSG_TYPES.CREATE_GAME, numberPlayers.value);
    }

    joinBtn.onclick = () => {
        socket.emit(Constants.MSG_TYPES.JOIN_GAME, gameId.value)
    }
}

/*const socket = io('/')

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
})*/