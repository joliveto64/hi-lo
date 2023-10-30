export default function Settings(props) {
  function handleClick() {
    props.resetToWelcomeScreen();
  }
  return (
    <div className="settings">
      <button onClick={props.toggleSettings} className="gear-icon">
        ⚙️
      </button>
      <button onClick={handleClick} className="back-button">
        {props.welcomeScreen ? "hi-lo" : "Quit game"}
      </button>
      <div className="settings-bottom">
        <div className="charts">
          <div className="chart">
            <h2>hi ↑</h2>
            <p>
              <strong>dice / points</strong>
            </p>
            <p>30 = 10</p>
            <p>29 = 9</p>
            <p>28 = 8</p>
            <p>27 = 7</p>
            <p>26 = 6</p>
            <p>25 = 5</p>
            <p>24 = 4</p>
            <p>23 = 3</p>
            <p>22 = 2</p>
            <p>&lt;22 = 1</p>
          </div>
          <div className="chart">
            <h2>lo ↓</h2>
            <p>
              <strong className="points">dice / points</strong>
            </p>
            <p>5 = 10</p>
            <p>6 = 9</p>
            <p>7 = 8</p>
            <p>8 = 7</p>
            <p>9 = 6</p>
            <p>10 = 5</p>
            <p>11 = 4</p>
            <p>12 = 3</p>
            <p>13 = 2</p>
            <p>&gt;13 = 1 </p>
          </div>
        </div>
        <div className="rules">
          <h2>How to play:</h2>
          <ul>
            <li>
              You are given five rolls per turn. Tap on a die to lock it in
              place.
            </li>
            <li>
              The number locked must be ≥ the number of rolls to continue.{" "}
            </li>
            <li>
              Based on the luck of your first role, aim for either high or low
              numbers.
            </li>
            <li>
              The final ↑↓ die is special. The number multiplies your score.
            </li>
            <li>
              ↑ or ↓ will determine which chart is used to calculate your score.
            </li>
            <li>
              Perfect score is all 6s and x3↑ <strong>or</strong> all 1s and x3↓
            </li>
            <li>The player with the highest score after 5 rounds wins!</li>
          </ul>

          <ul>
            <strong>Example:</strong>
            <li>You roll 6, 5, 5, 4, 4 and "x2↑" </li>
            <li>
              6 + 5 + 5 + 4 + 4 = <strong>24</strong>{" "}
            </li>
            <li>
              24 = <strong>4 points</strong> on the ↑ chart{" "}
            </li>
            <li>
              4 points x 2 = <strong>final score of 6</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
