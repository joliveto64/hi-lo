import { useState } from "react";
import Header from "./components/Header";
import Message from "./components/Message";
import Dice from "./components/Dice";
import { highTableData, lowTableData, hiLoDieArray } from "./data.js";

function App() {
  const [dice, setDice] = useState(generateDice);
  const [roundCount, setRoundCount] = useState(0);
  const [roll, setRoll] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [p1Turn, setP1Turn] = useState(true);
  const [lockCount, setLockCount] = useState(0);
  const [hiLoDie, setHiLoDie] = useState("?");
  const [scores, setScores] = useState({
    p1Score: 0,
    p2Score: 0,
  });

  function generateDice() {
    return Array.from({ length: 5 }).map((element, index) => {
      return {
        value: "?",
        isLocked: false,
        isPermLocked: false,
        id: index,
      };
    });
  }

  function handleButton() {
    setGameStarted(true);
    setRoll((prev) => (prev === 5 ? 1 : prev + 1));

    setDice((prev) => {
      return prev.map((die) => {
        return { ...die, value: Math.ceil(Math.random() * 6) };
      });
    });

    setHiLoDie(Math.ceil(Math.random() * 3));
  }

  function handleDiceClick(id) {
    if (gameStarted && lockCount >= roundCount) {
      setDice((prev) =>
        prev.map((die) => {
          return die.id === id ? { ...die, isLocked: !die.isLocked } : die;
        })
      );
    }
  }

  console.log(dice);

  return (
    <div className="App">
      <Header scores={scores} />
      <div>
        <Message roll={roll} />
        <div className="dice-container">
          {dice.map((die) => (
            <Dice
              key={die.id}
              value={die.value}
              isLocked={die.isLocked}
              clicked={() => {
                handleDiceClick(die.id);
              }}
            />
          ))}
          <span className="die">
            {hiLoDie + hiLoDieArray[Math.floor(Math.random() * 2)]}
          </span>
        </div>
      </div>
      <button onClick={handleButton}>
        {gameStarted ? "Roll" : "Start Game"}
      </button>
    </div>
  );
}

export default App;
