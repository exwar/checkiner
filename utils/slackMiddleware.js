const qs = require('qs');

const signinMiddleware = (req, res) => {
  if (!req.query.action) {
    res.status(400).end();
  }

  const params = {
    client_id: process.env.SLACK_APP_ID,
    redirect_uri: `${req.protocol}://${req.get('host')}/auth`,
  };

  switch (req.query.action) {
    case 'signin':
      params.scope = 'identity.basic,identity.avatar';
      params.state = `channel=${process.env.SLACK_APP_CHANNEL}`;
      break;
    case 'add-write-scope':
      params.scope = 'chat:write:user';
      break;
  }

  const url = `https://slack.com/oauth/authorize?${qs.stringify(params)}`;

  res.redirect(url);
};

module.exports = signinMiddleware;
