const players = [];
let gameid = 0;

// Join player to chat
function playerJoin(id, playername, game) {
  if(game === 'new'){
    game = gameid;
  }
  console.log(game)
  
  const player = { id, playername, game };

  players.push(player);

  return player;
}

// Get current player
function getCurrentplayer(id) {
  return players.find(player => player.id === id);
}

// player leaves chat
function playerLeave(id) {
  const index = players.findIndex(player => player.id === id);

  if (index !== -1) {
    return players.splice(index, 1)[0];
  }
}

// Get game players
function getgameplayers(gameid) {
  return players.filter(player => player.game === gameid);
}

module.exports = {
  playerJoin,
  getCurrentplayer,
  playerLeave,
  getgameplayers
};