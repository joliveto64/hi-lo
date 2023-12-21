export default function Settings(props) {
  return (
    <div className="settings">
      <span onClick={props.rotateScreen}>
        {props.autoRotate ? "Auto-rotate: " : "Auto-rotate: Off"}
        {props.autoRotate && (
          <span style={{ color: "rgb(var(--main-color))" }}>On</span>
        )}
      </span>
      <div className="settings-bottom">
        <div className="rules">
          <span className="change-color how-to-play">
            <strong>How to play:</strong>
          </span>
          <p>1. You are given five rolls per turn. Tap on a die to lock it.</p>
          <p>
            2. The number of dice locked must be equal to or greater than the
            roll you're on. So if it's roll #2, you need to have 2 dice locked
            to continue.{" "}
          </p>
          <p>
            3. For the most points, you want the highest OR the lowest rolls
            possible. You decide!
          </p>
          <p>
            4. The ↑↓ die is special. You want "↑" if you're going for high
            rolls, or "↓" if you're going for low rolls. The number on this die
            multiplies your points, so you want 3x whenever possible!
          </p>
          <p>5. Perfect score is all 6s and x3↑ OR all 1s and x3↓</p>
          <p>The player with the highest score after 5 rounds wins!</p>
        </div>

        <div className="charts">
          <span>
            <strong className="change-color">Scoring:</strong> The number on the
            left is the total for the 5 regular dice at the end of your turn.
            The number on the right is how many points you get for a x1
            multiplier on the hi-lo die.{" "}
          </span>
          <div className="chart">
            <span>
              <strong className="change-color">dice total ↑</strong>
            </span>
            <span>
              <strong className="change-color">points</strong>
            </span>
            <span className="border-bottom">30↑</span>
            <span className="border-bottom">10</span>
            <span className="border-bottom">29↑</span>
            <span className="border-bottom">9</span>
            <span className="border-bottom">28↑</span>
            <span className="border-bottom">8</span>
            <span className="border-bottom">27↑</span>
            <span className="border-bottom">7</span>
            <span className="border-bottom">26↑</span>
            <span className="border-bottom">6</span>
            <span className="border-bottom">25↑</span>
            <span className="border-bottom">5</span>
            <span className="border-bottom">24↑</span>
            <span className="border-bottom">4</span>
            <span className="border-bottom">23↑</span>
            <span className="border-bottom">3</span>
            <span className="border-bottom">22↑</span>
            <span className="border-bottom">2</span>
            <span>less than 22↑</span>
            <span>1</span>
          </div>
          <div className="chart">
            <span>
              <strong className="change-color">dice total↓</strong>
            </span>
            <span>
              <strong className="change-color">points</strong>
            </span>
            <span className="border-bottom">5↓</span>
            <span className="border-bottom">10</span>
            <span className="border-bottom">6↓</span>
            <span className="border-bottom">9</span>
            <span className="border-bottom">7↓</span>
            <span className="border-bottom">8</span>
            <span className="border-bottom">8↓</span>
            <span className="border-bottom">7</span>
            <span className="border-bottom">9↓</span>
            <span className="border-bottom">6</span>
            <span className="border-bottom">10↓</span>
            <span className="border-bottom">5</span>
            <span className="border-bottom">11↓</span>
            <span className="border-bottom">4</span>
            <span className="border-bottom">12↓</span>
            <span className="border-bottom">3</span>
            <span className="border-bottom">13↓</span>
            <span className="border-bottom">2</span>
            <span>more than 13↓</span>
            <span>1</span>
          </div>
        </div>
        <div className="example">
          <strong className="change-color">Example:</strong>
          <p>You roll 1, 2, 2, 3, 3 and "x2↓" </p>
          <p>
            1 + 2 + 2 + 3 + 3 = <strong>11</strong>{" "}
          </p>
          <p>
            11 = <strong>4 points</strong> on the ↓ chart{" "}
          </p>
          <p>
            4 points x 2 = <strong>final score of 8</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
