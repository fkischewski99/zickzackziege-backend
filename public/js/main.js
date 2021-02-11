const socket = io('/init');
playername = 'fred';
game = '1';

// Join chatroom
socket.emit('joingame', { playername, game });

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