const axios = require('axios').default;
const FormData = require('form-data');
const cheerio = require('cheerio');
const {LOCATION_MAP} = require('../constants/locations');
const {
  DEFAULT_TEAM_CODE,
} = require('../constants/default-team');


async function getMatches(team = DEFAULT_TEAM_CODE) {
  const url = 'https://ns3104249.ip-54-37-85.eu/shared/portales_files/agenda_portales.php';
  const form = new FormData();
  form.append('cliente', 'fmp');
  form.append('idm', 1);
  form.append('id_temp', 21);

  const response = await axios.post(url, form, { headers: form.getHeaders() });

  const $ = cheerio.load(response.data);
  const games = [];
  $('.fila_agenda').each((i, el) => {
    const paramGame = el.attribs['param_game'];

    if(String(paramGame).match(team)) {
      const location = $(el.childNodes[19]).html();
      const map = LOCATION_MAP[location];

      games.push({
        leage: $(el.childNodes[3].childNodes[0]).html(),
        date: $(el.childNodes[5]).html(),
        time: $(el.childNodes[7]).html(),
        local: $(el.childNodes[11]).html(),
        visit: $(el.childNodes[15]).html(),
        location: map ? `${location} - ${map}` : location,
      });
    }
  });
  // console.log('GAMES', games)

  return games;
}

module.exports = getMatches;
