const socket = io('/')
const Constants = {
    MSG_TYPES: {
        CREATE_GAME: 'create_game',
        JOIN_GAME: 'join_game',
        GAME_INFO_CREATED: 'game_info_created',
        GAME_INFO_JOINED: 'game_info_joined',
        GAME_START: 'game_start',
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
        console.log(`Spiel mit der ID ${gameId.value} beitreten.`)
        socket.emit(Constants.MSG_TYPES.JOIN_GAME, parseInt(gameId.value))
    }
}

socket.on(Constants.MSG_TYPES.GAME_INFO_CREATED, (game) => {
    let textarea = document.getElementById('createdGame')
    textarea.innerHTML = `Spiel mit der ID ${game.id} erstellt. Es kann dem Spiel beigetreten werden.`
})

socket.on(Constants.MSG_TYPES.GAME_INFO_JOINED, (game) => {
    let textarea = document.getElementById('createdGame')
    textarea.innerHTML = `Spiel mit der ID ${game.id} beigetreten.`
})

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