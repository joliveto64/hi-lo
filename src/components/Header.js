export default function Header({
  p1Score,
  p2Score,
  toggleSettings,
  roundCount,
  totalRounds,
  playerTurn,
}) {
  return (
    <div className="header">
      <button onClick={toggleSettings} className="gear-icon">
        . . .
      </button>
      <span className={`player-1-score ${playerTurn === 1 ? "blue" : ""}`}>
        p1 score: {p1Score}
      </span>

      <span className={`player-2-score ${playerTurn === 2 ? "blue" : ""}`}>
        p2 score: {p2Score}
      </span>

      <span className="round">
        round: {roundCount <= totalRounds ? roundCount : totalRounds}/
        {totalRounds}
      </span>
    </div>
  );
}
