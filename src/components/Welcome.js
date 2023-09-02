export default function Welcome({ clicked, toggleSettings }) {
  return (
    <div className="welcome-container">
      <button onClick={toggleSettings} className="gear-icon">
        . . .
      </button>
      <button className={`welcome-logo`}>
        <span className="welcome-arrows">↑↓</span>
      </button>

      <div className="welcome-button-container">
        <p className="welcome-text">
          Welcome to hi-lo! Click the three dots for rules.
        </p>
        <button
          onClick={() => {
            clicked("single");
          }}
        >
          single player
        </button>
        <button
          onClick={() => {
            clicked("two");
          }}
        >
          two players
        </button>
        <button
          onClick={() => {
            clicked("online");
          }}
        >
          online
        </button>
      </div>
    </div>
  );
}
