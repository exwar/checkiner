const express = require('express');
const next = require('next');
const fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser');
const checkinMiddleware = require('./utils/checkinMiddleware');
const authMiddleware = require('./utils/authMiddleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.get('/oauth', authMiddleware);
    server.post('/checkin', checkinMiddleware);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3010, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3010');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })
