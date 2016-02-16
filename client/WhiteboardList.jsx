import React from 'react';
import {Whiteboard} from './Whiteboard.jsx';

export const WhiteboardList = React.createClass({
  getInitialState() {
    return {
      curBoardId: null,
      boards: [],
      lines: [],
    };
  },

  createBoard() {
    const board = {
      id: Math.random().toString(),
      name: prompt('Board name'),
    };
    this.setState({boards: this.state.boards.concat(board)});
  },

  render() {
    return (
      <div>

        <button onClick={this.createBoard}>Create board</button>

        {this.state.boards.map(board => (
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
            lines={this.state.lines.filter(line => line.boardId === this.state.curBoardId)}
            onCreateLine={line => this.setState({lines: this.state.lines.concat(line)})}
            onDeleteLine={lineId => this.setState({lines: this.state.lines.filter(line => line.id !== lineId)})}
          />
        )}

      </div>
    );
  },
});
