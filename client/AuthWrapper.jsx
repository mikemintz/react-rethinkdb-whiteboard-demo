import React from 'react';
import RR from 'react-rethinkdb';
import {WhiteboardList} from './WhiteboardList.jsx';

export const AuthWrapper = React.createClass({
  getInitialState() {
    return {
      username: window.localStorage.getItem('username'),
      password: window.localStorage.getItem('password'),
    };
  },

  componentWillMount() {
    if (this.state.username) {
      this.connect(this.state.username, this.state.password);
    }
  },

  connect(username, password) {
    const path = '/api';
    RR.DefaultSession.connect({
      host: 'localhost',
      port: 8015,
      path: path,
      db: 'test',
    });
  },

  handleLogin(event) {
    event.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('password', password);
    this.setState({username, password});
    this.connect(username, password);
  },

  handleLogout() {
    RR.DefaultSession.close();
    this.setState({username: null, password: null});
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
  },

  render() {
    const loggedIn = !!this.state.username;
    return loggedIn ? (
      <div>
        <div style={{textAlign: 'right'}}>
          {this.state.username}
          {' | '}
          <button type="button" onClick={this.handleLogout}>Logout</button>
        </div>
        <WhiteboardList username={this.state.username} />
      </div>
    ) : (
      <form onSubmit={this.handleLogin}>
        <input type="text" placeholder="Username" ref="username" autoFocus={true} />
        <input type="text" placeholder="Password" ref="password" />
        <button type="submit">Login / Signup</button>
      </form>
    );
  },
});
