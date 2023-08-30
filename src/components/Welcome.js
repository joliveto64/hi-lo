export default function Welcome({ clicked }) {
  return (
    <div className="main-menu-container">
      <span className="main-menu-logo">
        <span className="arrows">↑↓</span>
      </span>

      <div className="main-menu-button-container">
        <p className="main-menu-text">
          Welcome to hi-lo! See how to play in settings (top right).
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
