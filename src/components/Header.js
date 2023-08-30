export default function Header(props) {
  return (
    <div className="header">
      <div className="left-container">
        <span
          className={`player-1-score ${props.playerTurn === 1 ? "blue" : ""}`}
        >
          p1 score: {props.p1Score}
        </span>
        <span
          className={`player-2-score ${props.playerTurn === 2 ? "blue" : ""}`}
        >
          p2 score: {props.p2Score}
        </span>
      </div>
      <div className="center-container"></div>
      <div className="right-container">
        <span className="round">
          round:{" "}
          {props.roundCount <= props.totalRounds
            ? props.roundCount
            : props.totalRounds}
          /{props.totalRounds}
        </span>
        <button onClick={props.menuClick} className="gear-icon">
          ⚙️
        </button>
      </div>
    </div>
  );
}
