export default function Settings(props) {
  function handleClick() {
    props.resetToWelcomeScreen();
  }
  return (
    <div className="settings">
      <header className="settings-top">
        <button onClick={handleClick} className="back-button">
          {props.welcomeScreen ? "" : "end game"}
        </button>
      </header>
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
          <h2>How to play hilo:</h2>
          <ul>
            <li>
              <strong>5</strong> rolls per turn
            </li>
            <li>Tap dice to lock them</li>
            <li>You can't roll if you haven't locked enough dice</li>
            <li>
              Aim for all <strong>high</strong> numbers (6 is best) or all{" "}
              <strong>low</strong> numbers (1 is best)
            </li>
            <li>
              The number on the "↑↓" die multiplies your points (3 is best)
            </li>
            <li>
              "↑" or "↓" determines which chart (above/left) is used for scoring
            </li>
            <li>
              <strong>A perfect score is all 6s or all 1s plus "3↑"</strong>
            </li>
            <li>Highest score after 5 rounds wins!</li>
          </ul>

          <ul>
            <strong>Example:</strong>
            <li>
              When your turn is over, your dice are 5, 4, 5, 6, 4 and "2↑"{" "}
            </li>
            <li>
              5 + 4 + 5 + 6 + 4 = <strong>dice total of 24</strong>{" "}
            </li>
            <li>
              Read the "↑" chart, 24 = <strong>3 points</strong>{" "}
            </li>
            <li>
              3 points x 2 on the "↑↓" die = <strong>grand total of 6</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
