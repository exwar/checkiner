const qs = require('qs');
const api = require('./api.js');

const logOutMiddleware = (req, res) => {
  if (!req.body.token) return res.status(400).end();

  const data = qs.stringify({
    token: req.body.token,
  });

  const url = `https://slack.com/api/auth.revoke?${data}`;

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

module.exports = logOutMiddleware;
