import { Component } from "react";

class Validation extends Component {
  state = {
    position: "",
    destination: "",
    squareStyles: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {position: nextProps.position, destination: nextProps.destination, squareStyles:{[nextProps.destination]: { backgroundColor: "deepPink" }}};
  }

  onDrop = ({ sourceSquare, targetSquare }) => {

    // split "a1" => [97, 49]
    //            => ["a", "1"]
    let [fromAbscissa, fromOrdinate] = [sourceSquare.charCodeAt(0), sourceSquare.charCodeAt(1)]
    let [toAbscissa, toOrdinate] = [targetSquare.charCodeAt(0), targetSquare.charCodeAt(1)]

    if (Math.abs(fromAbscissa - toAbscissa) === 2 && Math.abs(fromOrdinate - toOrdinate) === 1) {
      // allowable
    }
    else if (Math.abs(fromAbscissa - toAbscissa) === 1 && Math.abs(fromOrdinate - toOrdinate) === 2) {
      // allowable
    }
    else {
      // console.log('invalid move');
      return;
    }

    // if need store & display move history


    if (sourceSquare === this.state.destination) {
      alert('You has win, please click Reset to start a new game!');
      return;
    }
    // update position to parent component
    this.props.setPare(targetSquare);
    this.setState(() => ({
      position: {[targetSquare]: 'wN'},
    }));

    if (targetSquare === this.state.destination) {
      alert('You win!');
    }
  };

  render() {
    const { position, squareStyles } = this.state;
    return this.props.children({
      position: position,
      onDrop: this.onDrop,
      squareStyles: squareStyles,
    });
  }
}

export default Validation;
