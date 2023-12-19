export default function Header({
  p1Score,
  p2Score,
  toggleSettings,
  roundCount,
  totalRounds,
  playerTurn,
  showSettings,
  messageText,
  handleQuitGame,
  welcomeScreen,
}) {
  return (
    <div className="header">
      <span onClick={handleQuitGame}>{welcomeScreen ? "" : "Quit"}</span>{" "}
      <span className="rules-button-main" onClick={toggleSettings}>
        {showSettings ? "Close" : "Rules"}
      </span>
      <span className={`p1-score ${playerTurn === 1 ? "blue" : ""}`}>
        P1 score: {p1Score}
      </span>
      <span className={`p2-score ${playerTurn === 2 ? "blue" : ""}`}>
        P2 score: {p2Score}
      </span>
      <span className="round-info">{messageText()}</span>
      <span className="round">
        Round: {roundCount <= totalRounds ? roundCount : totalRounds}/
        {totalRounds}
      </span>
    </div>
  );
}
