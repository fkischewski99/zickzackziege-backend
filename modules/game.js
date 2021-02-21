const {findPlayer} = require('./players')

const games = [];

class Game {
  constructor(numberOfPlayers){
    this._numberOfPlayers = numberOfPlayers
    this.id = games.length +1
    this.players = []
    this.moves = []
  }
  
  gameReadyToStart(){
    return this.numberOfPlayers === this.players.length
  }

  gameFinished(){
    return false
  }

  get numberOfPlayers(){
    return this.numberOfPlayers
  }

  set numberOfPlayers(numberOfPlayers){
    this.numberOfPlayers =numberOfPlayers
  }

}

let game = new Game(9)
games.push(game)
  

function createGame(){
    game = {
        id: games.length +1,
        players: [],
        moves: []
    }

    games.push(game)
    return game;
}

function findGame(gameId){
    return games.find(game => game.id === gameId)
}

function joinGame(playerId, gameId){
  const player = findPlayer(playerId)
  if(!player)
    return null;

  game = findGame(gameId)
  if(!game)
    return

   game.players.push(player)
   return game;
}

function leaveGame(gameid, player){
    const index = games.findIndex(game => game.id === gameId);

  if (index !== -1) {
    return games.splice(index, 1)[0];
  }
}

module.exports = {
    createGame,
    findGame,
    joinGame,
    leaveGame,
  };