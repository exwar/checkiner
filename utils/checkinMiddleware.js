const qs = require('qs');
const dateUtils = require('./date.js');
const api = require('./api.js');

const MONTH_NAMES = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

const checkinMiddleware = (req, res) => {
  const currentDate = new Date();
  const humanDate = currentDate.getDate() + ' ' + MONTH_NAMES[currentDate.getMonth()];
  const attachments = [{
    fallback: `Check in by ${req.body.username} @ ${humanDate}`,
    color: '#915CB6',
    "fields": [
      {
        "title": dateUtils.isYesterdayASunday(currentDate) ? 'Friday' : 'Yesterday',
        "value": req.body.yesterday || 'Nothing',
        "short": false
      },
      {
        "title": 'Today',
        "value": req.body.today || 'Nothing',
        "short": false
      },
      {
        "value": req.body.isBlocked ? "Blocked 🛑" : "No blockers ✅",
        "short": false
      }
    ],
    footer: '<https://slackcheck.in|Stan\'s IT Chekiner 3000>'
  }];

  const data = qs.stringify({
    channel: process.env.CHECKINER_CHANNEL || '@stan',
    token: req.body.token,
    as_user: true,
    attachments: JSON.stringify(attachments),
  });

  const url = 'https://slack.com/api/chat.postMessage?' + data;

  fetch(url, {
      method: 'POST'
    })
    .then(api.checkResponse)
    .then(api.parseJson)
    .then(json => {
      if (json.ok) {
        return res.sendStatus(201)
      } else {
        return res.status(500).send(json);
      }
    })
    .catch((err) => {
      return res.status(500).send(err)
    });
}

module.exports = checkinMiddleware;
