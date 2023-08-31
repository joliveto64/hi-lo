export default function Header(props) {
  return (
    <div className="header">
      <span
        className={`player-1-score ${props.playerTurn === 1 ? "blue" : ""}`}
      >
        p1 score: {props.p1Score}
      </span>
      <button onClick={props.menuClick} className="gear-icon">
        . . .
      </button>
      <span
        className={`player-2-score ${props.playerTurn === 2 ? "blue" : ""}`}
      >
        p2 score: {props.p2Score}
      </span>

      <span className="round">
        round:{" "}
        {props.roundCount <= props.totalRounds
          ? props.roundCount
          : props.totalRounds}
        /{props.totalRounds}
      </span>
    </div>
  );
}
