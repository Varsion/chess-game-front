import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import Validation from "./Validation";
import { getNextStep, getStraightDestination } from "../api/api";

function Board() {
  const [position, setPosition] = useState("");
  const [destination, setDestination] = useState("");
  const [initialPosition, setInitialPosition] = useState("");

  const startGame = () => {
    let initialPosition = "";
    let destination = "";
    do {
      initialPosition = generatePosition();
      destination = generatePosition();
    } while (initialPosition === destination);

    setPosition(initialPosition);
    setInitialPosition(initialPosition);
    setDestination(destination);
  }

  const generatePosition = () => {
    const abscissas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ordinates = ['1', '2', '3', '4', '5', '6', '7', '8'];

    let position = abscissas[Math.floor(Math.random()*8)] + ordinates[Math.floor(Math.random()*8)];
    return position;
  }

  const nextStepSuggest = () => {
    if (checkWin()) {
      return;
    }

    getNextStep(position, destination).then((response) => {
      setPosition(response);
    }).catch((error) => {
      alert(error.message);
    })
  }

  const straightDestination = () => {
    if (checkWin()) {
      return;
    }

    getStraightDestination(position, destination).then((response) => {
      console.log(response);

      response.forEach((step, index) => {
        setTimeout(() => {
          setPosition(step);
        }, index * 1000)
      })
    }).catch((error) => {
      alert(error.message);
    })
  }

  const checkWin = () => {
    if (position === "" || destination === "") {
      alert('Please click Start Game to start!');
      return true;
    } else if (position === destination) {
      alert('You won!');
      return true;
    } else {
      return false;
    }
  }

  const reset = () => {
    setPosition(initialPosition);
  }


  return (
    <div>
      <Validation
        position={{[position]: 'wN'}}
        destination={destination}
        setPare={(position) => setPosition(position)}
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

      <button onClick={() => startGame()}>Start Game</button>
      <button onClick={() => reset()}>Reset</button>
      <br />
      <button onClick={() => nextStepSuggest()}>Suggest Next Step</button>
      <button onClick={() => straightDestination()}>Straight Destination</button>
    </div>
  );
}

export default Board;