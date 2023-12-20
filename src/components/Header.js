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
    <>
      <div className="menu-quit-buttons">
        <span className="quit-btn" onClick={handleQuitGame}>
          {welcomeScreen ? "" : "Quit"}
        </span>{" "}
        <span className="menu-btn" onClick={toggleSettings}>
          {showSettings ? "Close" : "Menu"}
        </span>
      </div>
      <div className="header">
        <span className={`p1-score ${playerTurn === 1 ? "blue" : ""}`}>
          P1 score: {p1Score}
        </span>
        <span className={`p2-score ${playerTurn === 2 ? "blue" : ""}`}>
          P2 score: {p2Score}
        </span>
        <span className="roll-count">{messageText()}</span>
        <span className="round-count">
          Round: {roundCount <= totalRounds ? roundCount : totalRounds}/
          {totalRounds}
        </span>
      </div>
    </>
  );
}
