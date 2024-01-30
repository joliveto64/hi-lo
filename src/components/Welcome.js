import { useState } from "react";

export default function Welcome({ clicked }) {
  let [index, setIndex] = useState(0);

  let colors = [
    // blue
    "121, 191, 237",
    // orange
    "255, 170, 100",
    // green
    "128, 228, 152",
    // red
    "230, 90, 90",
    // purple
    "214, 159, 237",
    // yellow
    "231, 208, 98",
  ];

  function handleColorChange() {
    let nextIndex = index >= colors.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
    document.documentElement.style.setProperty(
      "--main-color",
      colors[nextIndex]
    );
  }

  return (
    <div className="welcome-container">
      <span onClick={handleColorChange} className={`welcome-logo`}>
        <span className="welcome-arrows">↑↓</span>
      </span>

      <div className="welcome-button-container">
        <p className="welcome-text">
          Welcome to hi-lo! Tap the die to change color.
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
