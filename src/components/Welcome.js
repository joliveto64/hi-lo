import { handleDiceSpinAnimation } from "../utils";

export default function Welcome({ clicked, isSpinning, setIsSpinning }) {
  return (
    <div className={`main-menu-container`}>
      <span className="main-menu-logo">
        <span className="arrows">↑↓</span>
      </span>

      <div className="main-menu-button-container">
        <p className="main-menu-text">
          Welcome to hi-lo! Click the three dots to see the rules.
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
