const {findPlayer} = require('./players')

const games = [];

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
    //return null;
  
  console.log(gameId)
  if(gameId == 'new'){
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