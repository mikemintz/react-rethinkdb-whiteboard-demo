import express from 'express';
import http from 'http';
import {listen} from 'rethinkdb-websocket-server';

const app = express();
app.use('/', express.static('assets'));

const httpServer = http.createServer(app);

const options = {
  httpServer: httpServer,
  httpPath: '/api',
  dbHost: 'localhost',
  dbPort: 28015,
  unsafelyAllowAnyQuery: true,
};

listen(options);
httpServer.listen(8015);
console.log('Whiteboard server started');
