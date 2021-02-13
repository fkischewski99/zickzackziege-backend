const express = require('express')
const app = express()

const {createGame, joinGame, leaveGame, findGame} = require('./game')

const players = [];

function createPlayer(player){
    console.log(player)
    if(!validatePlayer(player))
        return null
    const createdPlayer = {
        id: players.length + 1,
        name: player.name
    }
    players.push(createdPlayer)
    return createdPlayer
}

function getPlayers(){
    return players;
}

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

function validatePlayer(player){
    if(!player || !player.hasOwnProperty("name"))
        return false
    return true;
}

// Get game players
function getgameplayers(gameid) {
  return players.filter(player => player.game === gameid);
}

module.exports = {
  getPlayers,
  createPlayer,
  playerJoin,
  findPlayer,
  playerLeave,
  getgameplayers,
  validatePlayer
};