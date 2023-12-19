export default function Settings(props) {
  return (
    <div className="settings">
      <div className="menu-buttons">
        <button onClick={props.toggleSettings} className="gear-icon">
          {props.showSettings ? "Close" : "Rules"}
        </button>
      </div>
      <div className="settings-bottom">
        <div className="rules">
          <h1 className="change-color">
            <strong>How to play:</strong>
          </h1>
          <ul>
            <li>
              1. You are given five rolls per turn. Tap on a die to lock it.
            </li>
            <li>
              2. The number of dice locked must be equal to or greater than the
              roll you're on. So if it's roll #2, you need to have 2 dice locked
              to continue.{" "}
            </li>
            <li>
              3. For the most points, you want the highest OR the lowest rolls
              possible. You decide!
            </li>
            <li>
              4. The ↑↓ die is special. You want "↑" if you're going for high
              rolls, or "↓" if you're going for low rolls. The number on this
              die multiplies your points, so you want 3x whenever possible!
            </li>
            <li>5. Perfect score is all 6s and x3↑ OR all 1s and x3↓</li>
            <li>The player with the highest score after 5 rounds wins!</li>
          </ul>
        </div>

        <div className="charts">
          <p>
            <strong className="change-color">Scoring:</strong> The number on the
            left is the total for the 5 regular dice at the end of your turn.
            The number on the right is how many points you get for a x1
            multiplier on the hi-lo die.{" "}
          </p>
          <div className="chart">
            <p>
              <strong className="change-color">dice total ↑</strong>
            </p>
            <p>
              <strong className="change-color">points</strong>
            </p>
            <p className="border-bottom">30↑</p>
            <p className="border-bottom">10</p>
            <p className="border-bottom">29↑</p>
            <p className="border-bottom">9</p>
            <p className="border-bottom">28↑</p>
            <p className="border-bottom">8</p>
            <p className="border-bottom">27↑</p>
            <p className="border-bottom">7</p>
            <p className="border-bottom">26↑</p>
            <p className="border-bottom">6</p>
            <p className="border-bottom">25↑</p>
            <p className="border-bottom">5</p>
            <p className="border-bottom">24↑</p>
            <p className="border-bottom">4</p>
            <p className="border-bottom">23↑</p>
            <p className="border-bottom">3</p>
            <p className="border-bottom">22↑</p>
            <p className="border-bottom">2</p>
            <p>less than 22↑</p>
            <p>1</p>
          </div>
          <div className="chart">
            <p>
              <strong className="change-color">dice total↓</strong>
            </p>
            <p>
              <strong className="change-color">points</strong>
            </p>
            <p className="border-bottom">5↓</p>
            <p className="border-bottom">10</p>
            <p className="border-bottom">6↓</p>
            <p className="border-bottom">9</p>
            <p className="border-bottom">7↓</p>
            <p className="border-bottom">8</p>
            <p className="border-bottom">8↓</p>
            <p className="border-bottom">7</p>
            <p className="border-bottom">9↓</p>
            <p className="border-bottom">6</p>
            <p className="border-bottom">10↓</p>
            <p className="border-bottom">5</p>
            <p className="border-bottom">11↓</p>
            <p className="border-bottom">4</p>
            <p className="border-bottom">12↓</p>
            <p className="border-bottom">3</p>
            <p className="border-bottom">13↓</p>
            <p className="border-bottom">2</p>
            <p>more than 13↓</p>
            <p>1</p>
          </div>
        </div>
        <div className="example">
          <strong className="change-color">Example:</strong>
          <li>You roll 1, 2, 2, 3, 3 and "x2↓" </li>
          <li>
            1 + 2 + 2 + 3 + 3 = <strong>11</strong>{" "}
          </li>
          <li>
            11 = <strong>4 points</strong> on the ↓ chart{" "}
          </li>
          <li>
            4 points x 2 = <strong>final score of 8</strong>
          </li>
        </div>
      </div>
    </div>
  );
}
