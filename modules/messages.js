  
const moment = require('moment');

function formatMessage(username, game, text) {
  return {
    username,
    game,
    text,
    time: moment().format('HH:mm')
  };
}

module.exports = formatMessage;