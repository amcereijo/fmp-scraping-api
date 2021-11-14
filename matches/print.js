const moment = require('moment');
const {
  DEFAULT_TEAM_NAME
} = require('../constants/default-team');
const { DEFAULT_TIME_IN_DAYS } = require('../constants/match');

moment.locale('es');

function printMatch(matchMoment, game) {
  console.log(`Próximo partido *${matchMoment.format("dddd D MMMM")}* a las *${game.time}* en ${game.location}`);
  console.log(`\n${game.local} - ${game.visit}`);
  console.log('\n1.');
  console.log('\n\nPortero:');
  console.log('\n\nDelegado:');
  if (game.local.match(DEFAULT_TEAM_NAME)) {
    console.log('Anotador:');
  }
  console.log('\n\n');
}

function printNextWeeks(games) {
  games.forEach((game) => {
    const matchMoment = moment(game.date, 'DD/MM/YYYY');
    const momentNow = moment();

    if(momentNow.add(DEFAULT_TIME_IN_DAYS, 'days').isAfter(matchMoment)) {
      if(game.time) {
        printMatch(matchMoment, game);
      }
    }
  });
}

module.exports = { printMatch, printNextWeeks };
