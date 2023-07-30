export default function Header(props) {
  return (
    <div className="header">
      <div className="scores">
        <span className="player-1-score">p1 score: {props.scores.p1Score}</span>
        <span className="player-2-score">p2 score: {props.scores.p2Score}</span>
      </div>
      <div className="right-container">
        <span className="round">round: 1/5</span>
        <span className="gear-icon">⚙️</span>
      </div>
    </div>
  );
}
