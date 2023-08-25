import { Component } from "react";
import Chessboard from "chessboardjsx";
import Validation from "./Validation";

class Board extends Component {
  state = {
    position: "",
    destination: "",
  }

  startGame = () => {
    let initialPosition = "";
    let destination = "";
    do {
      initialPosition = this.generatePosition();
      destination = this.generatePosition();
    } while (initialPosition === destination);

    this.setState(() => ({
      position: initialPosition,
      destination: destination,
    }));
  }

  generatePosition = () => {
    const abscissas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ordinates = ['1', '2', '3', '4', '5', '6', '7', '8'];

    let position = abscissas[Math.floor(Math.random()*8)] + ordinates[Math.floor(Math.random()*8)];
    return position;
  }

  render () {
    const { position, destination } = this.state;
    return (
      <div>
        <Validation
          position={{[position]: 'wN'}}
          destination={destination}
        >
        {({
            position,
            onDrop,
            squareStyles,
          }) => (
            <Chessboard
              position={position}
              squareStyles={squareStyles}
              onDrop={onDrop}
            />
          )}
        </Validation>

        <button onClick={() => this.startGame()}>Start Game</button>
        <button onClick={() => this.startGame()}>Reset</button>
      </div>
    );
  }
}

export default Board;
