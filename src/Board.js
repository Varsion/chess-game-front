import { Component } from "react";
import Chessboard from "chessboardjsx";
import Validation from "./Validation";
import { getNextStep } from "./api/api";

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

  setPare = (position) => {
    this.setState(() => ({
      position: position,
    }));
  }
  nextStepSuggest = () => {
    getNextStep(this.state.position, this.state.destination).then((response) => {
      alert(`You can move Knight to ${response}`);
    }).catch((error) => {
      console.log(error);
    })
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
          setPare={this.setPare}
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
        <button onClick={() => this.nextStepSuggest()}>Help </button>
      </div>
    );
  }
}

export default Board;
