const socket = io('/playGame');
playerId = 1
gameId = 'new';

// Join chatroom
socket.emit('joinGame', { playerId, gameId });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);
});

socket.on('gameInfo', game => {
  console.log(game)
})

// Output message to DOM
function outputMessage(message) {

}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
 }