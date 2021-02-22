const GameController = require('../database/GameController')
const {findPlayer} = require('./players')

const games = [];

class Game {
  constructor(numberOfPlayers){
    this.numberOfPlayers = numberOfPlayers
    this.id = games.length +1
    this.players = {}
    this.moves = {}
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

}

async function createGame(){
    let gameId = await GameController.createGame();
    let game = {
        id: gameId,
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
  if(!player) {
      console.log('Spieler nicht gefunden');
      return;
  }

  let game = undefined;

  if(gameId === 'new'){
    game = createGame();
  }else{
    game = findGame(gameId)
    if(!game)
        return
   }

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