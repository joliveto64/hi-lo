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
  let styles = {
    color: "rgb(var(--main-color))",
    fontWeight: "bold",
  };
  return (
    <>
      <span className="quit-btn" onClick={handleQuitGame}>
        {welcomeScreen ? "" : "Quit"}
      </span>{" "}
      <span className="menu-btn" onClick={toggleSettings}>
        {showSettings ? "Close" : "Menu"}
      </span>
      <div className="header">
        <span style={playerTurn === 1 ? styles : {}} className="p1-score">
          P1 score: {p1Score}
        </span>
        <span style={playerTurn === 2 ? styles : {}} className="p2-score">
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
