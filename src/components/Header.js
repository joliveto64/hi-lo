export default function Header({
  p1Score,
  p2Score,
  roundCount,
  totalRounds,
  playerTurn,
  messageText,
  gameIsOver,
}) {
  let styles = {
    color: "rgb(var(--main-color))",
    fontWeight: "bold",
  };

  function playerHighlight() {
    if (gameIsOver) {
      if (p1Score === p2Score) {
        return "tie";
      } else if (p1Score > p2Score) {
        return "p1";
      } else if (p2Score > p1Score) {
        return "p2";
      }
    }

    if (!gameIsOver) {
      if (playerTurn === 1) {
        return "p1";
      } else if (playerTurn === 2) {
        return "p2";
      }
    }
  }

  return (
    <>
      <div className="header">
        <span
          style={
            playerHighlight() === "p1" || playerHighlight() === "tie"
              ? styles
              : {}
          }
          className="p1-score"
        >
          P1 score: {p1Score}
        </span>
        <span className="roll-count">{messageText()}</span>
        <span
          style={
            playerHighlight() === "p2" || playerHighlight() === "tie"
              ? styles
              : {}
          }
          className="p2-score"
        >
          P2 score: {p2Score}
        </span>
        <span className="round-count">
          Round: {roundCount <= totalRounds ? roundCount : totalRounds}/
          {totalRounds}
        </span>
      </div>
    </>
  );
}
