import { handleDiceSpinAnimation } from "../utils";

export default function Welcome({ clicked, isSpinning, setIsSpinning }) {
  return (
    <div className="welcome-container">
      <span className="welcome-logo">
        <span className="welcome-arrows">↑↓</span>
      </span>

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
