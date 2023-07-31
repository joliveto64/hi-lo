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
  const [currentTotal, setCurrentTotal] = useState(0);
  const [scores, setScores] = useState({
    p1Score: 0,
    p2Score: 0,
  });

  function generateDice() {
    let diceArray = Array.from({ length: 5 }).map((element, index) => {
      return {
        value: "?",
        isLocked: false,
        isPermLocked: false,
        id: index,
      };
    });

    diceArray.push({
      value: "?",
      isLocked: false,
      isPermLocked: false,
      id: 5,
      isHiLoDie: true,
    });

    return diceArray;
  }

  function handleButton() {
    setGameStarted(true);

    setRoll((prev) => {
      if (prev === 5) {
        setRoundCount((prev) => (prev === 5 ? 1 : prev + 1));
        return 1;
      } else {
        return prev + 1;
      }
    });

    setDice((prev) => {
      return prev.map((die) => {
        if (die.isHiLoDie) {
          return {
            ...die,
            value: [
              Math.ceil(Math.random() * 3),
              hiLoDieArray[Math.floor(Math.random() * 2)],
            ],
          };
        } else {
          const randomNum = Math.ceil(Math.random() * 6);
          return { ...die, value: randomNum };
        }
      });
    });
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

  return (
    <div className="App">
      <Header scores={scores} roundCount={roundCount} />
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
        </div>
      </div>
      <button onClick={handleButton}>{gameStarted ? "Roll" : "Start"}</button>
    </div>
  );
}

export default App;
