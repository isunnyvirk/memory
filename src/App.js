import React, { Component } from 'react';
import Board from './board/Board.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-banner">
          <h3 className="title">Memory</h3>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
