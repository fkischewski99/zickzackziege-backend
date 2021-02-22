import { ROUTE } from "./Route.js";

window.onload = () => {
    let loginBtn = document.getElementById('loginBtn');
    let playerId = document.getElementById('playerId');
    let playerName = document.getElementById('playerName');

    loginBtn.onclick = async () => {
        let successfully = await login(playerId.value, playerName.value);
        if (successfully) {
            console.log('Erfolgreich angemeldet');
            window.location.replace(ROUTE + "connect")
        }
    }
}

async function login(playerId, playerName) {
    let playerData = {
        player: {
            id: playerId,
            name: playerName,
        }
    };

    let response = await fetch(ROUTE + 'api/player', {
        method: 'POST',
        headers: {
            'Accept': 'plain/text',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
    });

    return response.status < 400;
}