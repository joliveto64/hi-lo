export default function Welcome({ clicked, toggleSettings }) {
  return (
    <div className="welcome-container">
      <button onClick={toggleSettings} className="gear-icon">
        ⚙️
      </button>
      <span className={`welcome-logo`}>
        <span className="welcome-arrows">↑↓</span>
      </span>

      <div className="welcome-button-container">
        <p className="welcome-text">
          Welcome to hi-lo! Click the gear for rules.
        </p>
        <button
          onClick={() => {
            clicked("single");
          }}
        >
          Single player
        </button>
        <button
          onClick={() => {
            clicked("two");
          }}
        >
          Two players
        </button>
        {/* <button
          onClick={() => {
            clicked("online");
          }}
        >
          online
        </button> */}
      </div>
    </div>
  );
}
