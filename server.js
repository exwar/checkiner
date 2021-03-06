const express = require('express');
const next = require('next');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const slackMiddleware = require('./utils/slackMiddleware');
const checkinMiddleware = require('./utils/checkinMiddleware');
const authMiddleware = require('./utils/authMiddleware');
const logOutMiddleware = require('./utils/logOutMiddleware');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3010;
const app = next({ dev });
const handle = app.getRequestHandler();

// Checking for setted environment variables
const REQUIRED_ENV_VARS = ['SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET', 'SLACK_CHANNEL'];

REQUIRED_ENV_VARS.map(env => {
  if (process.env[env] === undefined) {
    throw `Please verify that all environment variables are correctly set:\n- ${REQUIRED_ENV_VARS.join('\n- ')}`;
  }
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(morgan(dev ? 'dev' : 'short'));
    server.enable('trust proxy');

    server.get('/slack', slackMiddleware);
    server.get('/oauth', authMiddleware);
    server.post('/checkin', checkinMiddleware);
    server.post('/logout', logOutMiddleware);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Checkiner is ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
