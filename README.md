# react-rethinkdb whiteboard demo

This is a demo project that demonstrates how to create a vanilla
[React](https://facebook.github.io/react/) app, integrate it with
[RethinkDB](https://www.rethinkdb.com/) as a backend database using the
[react-rethinkdb](https://github.com/mikemintz/react-rethinkdb) library, and
lock down the app with query validations in
[rethinkdb-websocket-server](https://github.com/mikemintz/rethinkdb-websocket-server).

For other demo apps that use react-rethinkdb, see the
[react-rethinkdb/examples](https://github.com/mikemintz/react-rethinkdb/tree/master/examples)
directory.

## Commits

To best follow along, look at how the app evolves over the [3
commits](https://github.com/mikemintz/react-rethinkdb-whiteboard-demo/commits/master).
As I update this demo, I will rewrite history so don't get too comfortable.

## Setup

You will need to install [node.js](https://nodejs.org/en/) with
[npm](https://www.npmjs.com/) and
[RethinkDB](https://www.rethinkdb.com/docs/install/).

Before you get started, run the following queries in the RethinkDB admin console:

```
r.db('test').tableCreate('users');
r.db('test').tableCreate('boards');
r.db('test').tableCreate('lines');
```

Run `npm install && npm start` at any given checkout of the demo to start the
web server. RethinkDB will need to be running in the background.
