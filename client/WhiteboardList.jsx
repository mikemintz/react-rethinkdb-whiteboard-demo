import React from 'react';
import {Whiteboard} from './Whiteboard.jsx';
import RR from 'react-rethinkdb';
const r = RR.r;

export const WhiteboardList = React.createClass({
  mixins: [RR.DefaultMixin],

  observe(props, state) {
    return {
      boards: new RR.QueryRequest({
        query: r.table('boards'),
        changes: true,
        initial: [],
      }),
    };
  },

  getInitialState() {
    return {
      curBoardId: null,
    };
  },

  createBoard() {
    const board = {
      name: prompt('Board name'),
    };
    RR.DefaultSession.runQuery(r.table('boards').insert(board));
  },

  render() {
    return (
      <div>

        <button onClick={this.createBoard}>Create board</button>

        {this.data.boards.value().map(board => (
          <span
            key={board.id}
            onClick={() => this.setState({curBoardId: board.id})}
            style={{
              marginLeft: 20,
              cursor: 'pointer',
              fontWeight: this.state.curBoardId === board.id && 'bold',
            }}
          >
            {board.name}
          </span>
        ))}

        <hr />

        {!!this.state.curBoardId && (
          <Whiteboard
            username={this.props.username}
            boardId={this.state.curBoardId}
          />
        )}

      </div>
    );
  },
});
