import express from 'express';
import http from 'http';
import {listen, r, RP} from 'rethinkdb-websocket-server';

const app = express();
app.use('/', express.static('assets'));

const httpServer = http.createServer(app);

const options = {
  httpServer: httpServer,
  httpPath: '/api',
  dbHost: 'localhost',
  dbPort: 28015,
  unsafelyAllowAnyQuery: false,
};

const connPromise = r.connect({
  host: options.dbHost,
  port: options.dbPort,
});
const runQuery = query => connPromise.then(conn => query.run(conn));

options.sessionCreator = ({username, password}) => {
  const session = {username};
  return runQuery(r.table('users').get(username)).then(user => {
    if (user) {
      return user.password === password ? session : Promise.reject('Forbidden');
    }
    const insertQuery = r.table('users').insert({id: username, password});
    return runQuery(insertQuery).then(() => session);
  });
};

options.queryWhitelist = [

  r
  .table("boards")
  .changes({"includeStates": true, "includeInitial": true})
  .opt("db", r.db("test")),

  r
  .table("boards")
  .insert({"name": RP.check(x => typeof x === 'string' && x.trim().length)})
  .opt("db", r.db("test")),

  r
  .table("lines")
  .filter({"boardId": RP.check(x => typeof x === 'string')})
  .changes({"includeStates": true, "includeInitial": true})
  .opt("db", r.db("test")),

  r
  .table("lines")
  .insert({
    "boardId": RP.ref("boardId"),
    "username": RP.ref("username"),
    "x1": RP.ref("x1"),
    "y1": RP.ref("y1"),
    "x2": RP.ref("x2"),
    "y2": RP.ref("y2"),
  })
  .opt("db", r.db("test"))
  .validate((refs, session) => {
    const {boardId, username, x1, y1, x2, y2} = refs;
    const chk = x => typeof x === 'number' && x >= 0 && x <= 300;
    if (chk(x1) && chk(y1) && chk(x2) && chk(y2)) {
      if (username === session.username) {
        return runQuery(r.db('test').table('boards').get(boardId).ne(null));
      }
    }
    return false;
  }),

  r
  .table("lines")
  .get(RP.ref("lineId"))
  .delete()
  .opt("db", r.db("test"))
  .validate((refs, session) => {
    return runQuery(r.db('test').table('lines').get(refs.lineId)('username').eq(session.username));
  }),

];

listen(options);
httpServer.listen(8015);
console.log('Whiteboard server started');
