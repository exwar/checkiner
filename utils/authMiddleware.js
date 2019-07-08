const qs = require('qs');
const api = require('./api.js');

const authMiddleware = (req, res) => {
  const data = qs.stringify({
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: req.query.code,
    redirect_uri: `${req.protocol}://${req.get('host')}/auth`
  });

  if (!req.query.code) return res.status(400);

  const url = `https://slack.com/api/oauth.access?${data}`;

  fetch(url)
    .then(api.checkStatus)
    .then(api.parseJSON)
    .then(json => {
      if (json.ok) {
        return res.json(json);
      } else {
        return res.status(500).send(json);
      }
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

module.exports = authMiddleware;
