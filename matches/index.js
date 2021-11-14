const getMatches = require('./get-matches');
const { printNextWeeks } = require('./print');

async function nextMatchesAsString() {
  const games = await getMatches();
  printNextWeeks(games);
}

module.exports = { nextMatchesAsString };
