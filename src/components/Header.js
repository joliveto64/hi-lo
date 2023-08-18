export default function Header(props) {
  return (
    <div className="header">
      <div className="left-container">
        <span
          className="player-1-score"
          style={{ color: props.playerTurn === 1 ? "red" : "black" }}
        >
          p1 score: {props.p1Score}
        </span>
        <span
          className="player-2-score"
          style={{ color: props.playerTurn === 2 ? "red" : "black" }}
        >
          p2 score: {props.p2Score}
        </span>
      </div>
      <div className="right-container">
        <span className="round">
          round: {props.roundCount <= 2 ? props.roundCount : "2"}
        </span>
        <span className="gear-icon">⚙️</span>
      </div>
    </div>
  );
}
