import express from 'express';
import http from 'http';

const app = express();
app.use('/', express.static('assets'));

const httpServer = http.createServer(app);

httpServer.listen(8015);
console.log('Whiteboard server started');
