import { useState, useEffect } from "react";
import Header from "./components/Header";
import Message from "./components/Message";
import Dice from "./components/Dice";
import { hiLoDieArray, hiTableData, loTableData } from "./data.js";

function App() {
  const [dice, setDice] = useState(generateDice);
  const [gameState, setGameState] = useState({
    playerTurn: 1,
    lockCount: 0,
    p1Score: 0,
    p2Score: 0,
    masterCount: 0,
    gameStarted: false,
  });

  const { masterCount, playerTurn, lockCount, p1Score, p2Score, gameStarted } =
    gameState;
  const rollCount =
    masterCount === 0 ? 0 : masterCount % 5 === 0 ? 5 : masterCount % 5;
  const roundCount = Math.ceil(masterCount / 10);

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
      value: "↑↓",
      isLocked: false,
      isPermLocked: false,
      id: 5,
    });

    return diceArray;
  }

  function handleButton() {
    setGameState((previous) => ({
      ...previous,
      masterCount: previous.masterCount + 1,
      playerTurn:
        previous.masterCount + 1 > 1 && (previous.masterCount + 1) % 5 === 1
          ? previous.playerTurn === 1
            ? 2
            : 1
          : previous.playerTurn,
    }));

    setDice((prev) =>
      prev.map((die, index) => {
        if (die.isLocked) {
          return {
            ...die,
            isPermLocked: true,
          };
        }
        if (index === prev.length - 1 && !die.isPermLocked) {
          return {
            ...die,
            value:
              Math.ceil(Math.random() * 3) +
              hiLoDieArray[Math.floor(Math.random() * 2)],
          };
        }
        if (!die.isPermLocked) {
          return { ...die, value: Math.ceil(Math.random() * 6) };
        }
      })
    );
  }

  function handleDiceClick(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id && !die.isPermLocked
          ? { ...die, isLocked: !die.isLocked }
          : die
      )
    );
  }

  function calculateScore() {
    let total = 0;
    let totalPoints;
    let HiLoDieValue = dice[dice.length - 1].value;
    let hiLoNum = parseInt(HiLoDieValue[0]);
    let hiLo = HiLoDieValue[1];

    dice.forEach((die, index) => {
      if (index !== dice.length - 1) {
        total += die.value;
      }
    });

    if (hiLo === "↑") {
      totalPoints = hiTableData[total] || 1;
    } else if (hiLo === "↓") {
      totalPoints = loTableData[total] || 1;
    }

    const finalScore = totalPoints * hiLoNum;

    console.log(total, totalPoints, finalScore);
  }

  return (
    <div className="App">
      <Header
        p1Score={p1Score}
        p2Score={p2Score}
        roundCount={roundCount}
        playerTurn={playerTurn}
      />
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
      <button onClick={handleButton}>Roll</button>
    </div>
  );
}

export default App;
