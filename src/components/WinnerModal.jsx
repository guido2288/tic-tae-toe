import Square from "./Square";

const WinnerModal = ({winner, resetGame}) => {
  if(winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó:';

  return (
    <section>
  
        <section className="winner">
          <div className="text">
            <h2>{winnerText}</h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>

          </div>
        </section>
    
    
  </section>
  )
}

export default WinnerModal