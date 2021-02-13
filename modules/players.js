const express = require('express')
const app = express()

const {createGame, joinGame, leaveGame, findGame} = require('./game')

const players = [];

app.get("/", (req, res ) => {
    res.send({players: players})
})


// Join player to game an Create game if gameId is "new"
function playerJoin(gameId, playerId) {
  const player = findPlayer(playerId);
  if(!player)
    return null;
  
  if(gameId === "new")
    game = createGame();
  else{
    game = findGame(gameId)
    if(!game)
        return
  }

  game.joinGame(player)

  return game;
}

// Get current player
function findPlayer(id) {
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
  getCurrentplayer: findPlayer,
  playerLeave,
  getgameplayers
};