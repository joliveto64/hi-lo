import { useState, useEffect } from "react";
import Header from "./components/Header";
import Message from "./components/Message";
import Dice from "./components/Dice";
import { hiLoDieArray, hiTableData, loTableData } from "./data.js";
import { generateDice } from "./utils";

function App() {
  // CONSTANTS AND SETTING UP STATE /////////////////////////////////
  const [dice, setDice] = useState(generateDice);
  const [gameState, setGameState] = useState({
    playerTurn: 1,
    lockCount: 0,
    p1Score: 0,
    p2Score: 0,
    masterCount: 0,
  });

  const { masterCount, playerTurn, lockCount, p1Score, p2Score } = gameState;
  const rollCount =
    masterCount === 0 ? 0 : masterCount % 5 === 0 ? 5 : masterCount % 5;
  const roundCount = Math.ceil(masterCount / 10);
  const totalRounds = 2;
  const gameIsOver = roundCount > totalRounds;

  // MAIN LOGIC & BUTTON CLICK /////////////////////////////////

  function handleButton() {
    advanceRound();

    setGameState((previous) => {
      const newState = { ...previous };
      newState.masterCount = previous.masterCount + 1;

      if (newState.masterCount > 1 && newState.masterCount % 5 === 1) {
        newState.playerTurn = previous.playerTurn === 1 ? 2 : 1;

        playerTurn === 1
          ? (newState.p1Score += calculateScore())
          : (newState.p2Score += calculateScore());

        unlockDice();
      }

      return newState;
    });

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

  // FUNCTIONS /////////////////////////////////

  function messageText() {
    if (!gameIsOver) {
      return `roll: ${rollCount}/5`;
    }
    if (gameIsOver && p1Score === p2Score) {
      return "tie game!";
    }
    if (gameIsOver && p1Score > p2Score) {
      return "p1 wins!";
    }

    return "p2 wins!";
  }

  useEffect(() => {
    const count = dice.reduce(
      (total, die) => (die.isLocked ? total + 1 : total),
      0
    );
    setGameState((prev) => ({ ...prev, lockCount: count }));
  }, [dice]);

  function unlockDice() {
    setDice((oldDice) =>
      oldDice.map((die) => ({ ...die, isLocked: false, isPermLocked: false }))
    );
  }

  function handleDiceClick(id) {
    if (masterCount < 1) {
      return;
    }

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
    return finalScore;
  }

  function getButtonText() {
    if (gameIsOver) {
      return "New Game";
    } else if (roundCount === totalRounds && playerTurn === 2) {
      return "End game";
    } else if (masterCount < 1) {
      return "Start";
    } else if (lockCount === 6) {
      return "End turn";
    } else {
      return "roll";
    }
  }

  function advanceRound() {
    const score = calculateScore();
    if (lockCount === 6) {
      unlockDice();
      setGameState((prev) => ({
        ...prev,
        masterCount: prev.masterCount + (5 - rollCount),
        p1Score: playerTurn === 1 ? prev.p1Score + score : prev.p1Score,
        p2Score: playerTurn === 2 ? prev.p2Score + score : prev.p2Score,
      }));
    }
  }

  function startNewGame() {
    setDice(generateDice);
    setGameState({
      playerTurn: 1,
      lockCount: 0,
      p1Score: 0,
      p2Score: 0,
      masterCount: 0,
    });
  }

  return (
    <div className="App">
      <Header
        p1Score={p1Score}
        p2Score={p2Score}
        roundCount={roundCount}
        playerTurn={playerTurn}
        totalRounds={totalRounds}
      />
      <div>
        <p className="round-info">{messageText()}</p>
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
      <button
        onClick={!gameIsOver ? handleButton : startNewGame}
        disabled={lockCount < rollCount && !gameIsOver}
      >
        {getButtonText()}
      </button>
    </div>
  );
}

export default App;
