import { useState, useEffect } from "react";
import Header from "./components/Header";
import Message from "./components/Message";
import Dice from "./components/Dice";
import { highTableData, lowTableData, hiLoDieArray } from "./data.js";

function App() {
  const [dice, setDice] = useState(generateDice);
  const [roundCount, setRoundCount] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [p1Turn, setP1Turn] = useState(true);
  const [lockCount, setLockCount] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [scores, setScores] = useState({
    p1Score: 0,
    p2Score: 0,
  });

  useEffect(() => {
    let totalLocked = 0;

    for (let die of dice) {
      if (die.isLocked) {
        totalLocked += 1;
      }
    }

    setLockCount(totalLocked);
  }, [dice]);

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
    if (
      (rollCount < 5 && lockCount >= rollCount) ||
      (rollCount === 5 && lockCount === 6)
    ) {
      setGameStarted(true);

      setRollCount((prev) => {
        if (prev === 5 || lockCount === 6) {
          if (!p1Turn) {
            setRoundCount((prev) => (prev === 5 ? 1 : prev + 1));
          }
          setP1Turn(!p1Turn);
          unlockDice();
          return 1;
        } else {
          return prev + 1;
        }
      });

      setDice((prev) => {
        return prev.map((die) => {
          if (die.isPermLocked) {
            return die;
          } else if (die.isLocked) {
            return { ...die, isPermLocked: true };
          } else if (die.isHiLoDie) {
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
  }

  function handleDiceClick(id) {
    if (gameStarted) {
      setDice((prev) =>
        prev.map((die) => {
          if (die.id === id && !die.isPermLocked) {
            return { ...die, isLocked: !die.isLocked };
          } else {
            return die;
          }
        })
      );
    }
  }

  function unlockDice() {
    setDice((prev) =>
      prev.map((die) => {
        return { ...die, isLocked: false, isPermLocked: false };
      })
    );
  }

  console.log(lockCount);

  return (
    <div className="App">
      <Header scores={scores} roundCount={roundCount} p1Turn={p1Turn} />
      <div>
        <Message rollCount={rollCount} />
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
