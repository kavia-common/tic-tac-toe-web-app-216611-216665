import React, { useMemo, useState } from 'react';

function calculateWinner(squares) {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function isDraw(squares) {
  return squares.every(Boolean);
}

// PUBLIC_INTERFACE
export default function App() {
  /** Main application component for the Tic Tac Toe game. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const draw = !winner && isDraw(squares);

  const statusText = winner
    ? `Winner: ${winner}`
    : draw
      ? 'Draw'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleSquareActivate(index) {
    if (winner || squares[index]) return;

    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="page">
      <main className="card" aria-label="Tic Tac Toe game">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="status" role="status" aria-live="polite">
            {statusText}
          </p>
        </header>

        <section
          className="board"
          role="grid"
          aria-label="3 by 3 Tic Tac Toe board"
        >
          {squares.map((value, idx) => {
            const isWinning = Boolean(line?.includes(idx));
            const label = value
              ? `Square ${idx + 1}, ${value}`
              : `Square ${idx + 1}, empty`;

            return (
              <button
                key={idx}
                type="button"
                className={`square ${isWinning ? 'square--win' : ''}`}
                onClick={() => handleSquareActivate(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSquareActivate(idx);
                  }
                }}
                role="gridcell"
                aria-label={label}
                aria-disabled={winner || Boolean(value)}
                disabled={winner || Boolean(value)}
              >
                {value}
              </button>
            );
          })}
        </section>

        <footer className="footer">
          <button type="button" className="reset" onClick={reset}>
            Reset game
          </button>
          <div className="legend" aria-label="Legend">
            <span className="pill pill--x">X</span>
            <span className="pill pill--o">O</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
