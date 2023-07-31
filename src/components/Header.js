export default function Header(props) {
  return (
    <div className="header">
      <div className="scores">
        <span
          className="player-1-score"
          style={{ color: props.p1Turn ? "red" : "black" }}
        >
          p1 score: {props.scores.p1Score}
        </span>
        <span
          className="player-2-score"
          style={{ color: props.p1Turn ? "black" : "red" }}
        >
          p2 score: {props.scores.p2Score}
        </span>
      </div>
      <div className="right-container">
        <span className="round">round: {props.roundCount}</span>
        <span className="gear-icon">⚙️</span>
      </div>
    </div>
  );
}
