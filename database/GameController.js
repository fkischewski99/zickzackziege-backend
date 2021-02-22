let GameController = {
    createGame: async () => {
        // Spiel wird in der Datenbank angelegt
        // GameID wird zurückgegeben (hier nur ein Mock)
        let gameId = parseInt(Math.random() * 1000);
        console.log(`Spiel mit der ID ${gameId} erstellt`)
        return gameId;
    }
}

module.exports = GameController