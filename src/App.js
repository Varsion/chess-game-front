import './App.css';
import { Component } from 'react';
import Board from './Board';
class App extends Component {
  render() {
    return(
      <div className="App">
        <div>
          <h2>Chess Game</h2>
          <p>
            Click <b>Start Game</b>: a knight will be placed on a random square of the chessboard.
          </p>
          <p>
            At the same time, a random square will be selected as the destination which has a different color.
          </p>
          <p>
            Get to the destination will be the goal of the game.
          </p>
          <p>
            Click <b>Reset</b> to start a new game.
          </p>
        </div>
        <div className="App-header">
          <Board />
        </div>
      </div>
    )
  };
}

export default App;
