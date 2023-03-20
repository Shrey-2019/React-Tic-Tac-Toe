import React from 'react';
import { useState } from 'react';
function Square({ value, onSquareClick }) {

  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function chooseWinner(squareValue) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squareValue[a] && squareValue[a] === squareValue[b] && squareValue[a] === squareValue[c]) {
      return squareValue[a];
    }
  }
  return null;
}

export default function Game() {
  
  const [history, setHistoryValue] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistoryValue(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squareValue={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squareValue, onPlay }) {

  function handleClick(i) {
    if (chooseWinner(squareValue) || squareValue[i]) {
      return;
    }

    const nextsquareValue = squareValue.slice();
    if (xIsNext) {
      nextsquareValue[i] = 'X';
    }
    else {
      nextsquareValue[i] = 'O';
    }
    onPlay(nextsquareValue);
  }

  const winner = chooseWinner(squareValue);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <div>
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squareValue[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squareValue[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squareValue[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squareValue[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squareValue[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squareValue[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squareValue[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squareValue[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squareValue[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}


