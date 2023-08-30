export default function Settings() {
  return (
    <div className="settings">
      <div className="charts">
        <div className="chart">
          <h2>hi ↑</h2>
          <p>
            <strong>dice / points</strong>
          </p>
          <p>30 = 10</p>
          <p>29 = 8</p>
          <p>28 = 7</p>
          <p>27 = 6</p>
          <p>26 = 5</p>
          <p>25 = 4</p>
          <p>24 = 3</p>
          <p>23 = 2</p>
          <p>&lt;22 = 1</p>
        </div>
        <div className="chart">
          <h2>lo ↓</h2>
          <p>
            <strong className="points">dice / points</strong>
          </p>
          <p>5 = 10</p>
          <p>6 = 8</p>
          <p>7 = 7</p>
          <p>8 = 6</p>
          <p>9 = 5</p>
          <p>10 = 4</p>
          <p>11 = 3</p>
          <p>12 = 2</p>
          <p>&gt;13 = 1</p>
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
          <li>The number on the "↑↓" die multiplies your points (3 is best)</li>
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
          <li>When your turn is over, your dice are 5, 4, 5, 6, 4 and "2↑" </li>
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
  );
}
