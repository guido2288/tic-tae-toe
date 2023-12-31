import { useState } from "react";
import confetti from "canvas-confetti";

import Square from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner , checkEndGame } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import BoardGame from "./components/BoardGame";


function App() {

  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board');

    if(boardFromStorage) return JSON.parse(boardFromStorage)

    return Array(9).fill(null)
  
  });

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn');
    
    return turnFromStorage ?? TURNS.X
  
  });

  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que hay un empate



  const updateBoard = (index) => {

    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    //Guardar partida en localStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <BoardGame board={board} updateBoard={updateBoard}/>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
