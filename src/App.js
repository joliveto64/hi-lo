import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Dice from "./components/Dice";
import { hiLoDieArray, hiTableData, loTableData } from "./data.js";
import { generateDice } from "./utils";
import Settings from "./components/Settings";
import { db } from "./firebase.js";
import { set, ref, onValue } from "firebase/database";
import Npc from "./components/Npc";

function App() {
  // STATE INITIALIZATION /////////////////////////////////
  const [dice, setDice] = useState(generateDice);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameState, setGameState] = useState({
    p1Score: 0,
    p2Score: 0,
    masterCount: 0,
    betweenRound: false,
  });

  const [showMenu, setShowMenu] = useState(false);
  const [isOnline] = useState(false);
  const [npcState, setNpcState] = useState({
    hasRolled: false,
    hasLocked: true,
    npcIsActive: true,
  });

  // CONSTANTS/DERIVED STATES ///////////////////////////////////////
  const { masterCount, p1Score, p2Score, betweenRound } = gameState;
  const { hasRolled, hasLocked, npcIsActive } = npcState;
  const rollCount =
    masterCount === 0 ? 0 : masterCount % 5 === 0 ? 5 : masterCount % 5;
  const roundCount = Math.ceil(masterCount / 10);
  const totalRounds = 5;
  const gameIsOver = roundCount > totalRounds;
  const gameIsStarted = masterCount >= 1;
  const rollFive = rollCount === 5;
  const playerTurn = (Math.floor((masterCount - 1) / 5) % 2) + 1;
  const lockCount = dice.reduce(
    (total, die) => (die.isLocked ? total + 1 : total),
    0
  );
  const allDiceLocked = lockCount === 6;

  // FIREBASE /////////////////////////////////////////////////////
  useEffect(() => {
    // update DB whenever masterCount changes
    if (isOnline) {
      const gameStateRef = ref(db, `/gameState`);
      const diceRef = ref(db, "/dice");
      set(diceRef, dice);
      set(gameStateRef, gameState);
    }
  }, [masterCount]);

  useEffect(() => {
    if (!isOnline) {
      return;
    }
    // fetch dice data
    onValue(
      ref(db, "/dice"),
      (snapshot) => {
        const data = snapshot.val();
        setDice(data);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    if (!isOnline) {
      return;
    }
    // fetch gameState data
    onValue(
      ref(db, "/gameState"),
      (snapshot) => {
        const data = snapshot.val();
        setGameState(data);
        handleDiceSpinAnimation();
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  // MAIN LOGIC FOR BUTTON CLICK //////////////////////////////////////////

  function handleButton() {
    handleDiceSpinAnimation();
    const score = calculateScore();

    if (betweenRound) {
      rollDice();
      setGameState((prev) => ({ ...prev, betweenRound: false }));
      return;
    }

    if (allDiceLocked && !betweenRound) {
      unlockDice();
      setDice(generateDice);
      setGameState((prev) => ({
        ...prev,
        masterCount: prev.masterCount + (6 - rollCount),
        p1Score: playerTurn === 1 ? prev.p1Score + score : prev.p1Score,
        p2Score: playerTurn === 2 ? prev.p2Score + score : prev.p2Score,
        betweenRound: true,
      }));
    }

    if (lockCount < 6 && !betweenRound) {
      setGameState((previous) => ({
        ...previous,
        masterCount: previous.masterCount + 1,
      }));
      rollDice();
    }
  }

  // NPC LOGIC ////////////////////////////////////////////////////////////

  useEffect(() => {
    let timeoutId;
    if (npcIsActive && playerTurn === 2 && hasLocked) {
      timeoutId = setTimeout(() => {
        handleButton();
        setNpcState((prev) => ({ ...prev, hasRolled: true, hasLocked: false }));
      }, 750);
    }
    return () => clearTimeout(timeoutId);
  }, [npcIsActive, playerTurn, hasLocked]);

  useEffect(() => {
    let timeoutId;
    if (npcIsActive && playerTurn === 2 && !allDiceLocked && hasRolled) {
      timeoutId = setTimeout(() => {
        keepDie();
        setNpcState((prev) => ({ ...prev, hasLocked: true, hasRolled: false }));
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [npcIsActive, playerTurn, allDiceLocked, hasRolled]);

  function keepDie() {
    let goingHi = false;
    let goingLo = false;
    let flagToEndRoll = false;
    const newDice = [...dice];

    function createTotalsObject() {
      return {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        "3↑": 0,
        "2↑": 0,
        "1↑": 0,
        "3↓": 0,
        "2↓": 0,
        "1↓": 0,
      };
    }

    let totals = createTotalsObject();
    let totalsUnlocked = createTotalsObject();
    let totalsPermLocked = createTotalsObject();

    for (let i = 0; i < newDice.length; i++) {
      totals[newDice[i].value]++;

      if (!newDice[i].isPermLocked) {
        totalsUnlocked[newDice[i].value]++;
      }

      if (newDice[i].isPermLocked) {
        totalsPermLocked[newDice[i].value]++;
      }
    }

    let loScore =
      totals[1] * 5 +
      totalsPermLocked[1] * 10 +
      totals[2] * 3 +
      totalsPermLocked[2] * 6 +
      totals[3] +
      totals["2↓"] * 3 +
      totalsPermLocked["2↓"] * 6 +
      totals["3↓"] * 5 +
      totalsPermLocked["3↓"] * 10;

    let hiScore =
      totals[4] +
      totals[5] * 3 +
      totalsPermLocked[5] * 6 +
      totals[6] * 5 +
      totalsPermLocked[6] * 10 +
      totals["2↑"] * 3 +
      totalsPermLocked["2↑"] * 6 +
      totals["3↑"] * 5 +
      totalsPermLocked["3↑"] * 10;

    if (loScore >= hiScore) {
      goingLo = true;
    } else {
      goingHi = true;
    }

    console.log(hiScore, loScore);

    for (let i = 0; i < newDice.length; i++) {
      let die = newDice[i];
      let value = newDice[i].value;

      if (!die.isPermLocked) {
        if (goingHi) {
          if (value === 5 || value === 6 || value === "3↑" || value === "2↑") {
            die.isLocked = true;
            continue;
          } else if (rollCount >= 4 && (value === 4 || value === "1↑")) {
            die.isLocked = true;
            continue;
          } else if (
            value === 4 &&
            totalsUnlocked[5] === 0 &&
            totalsUnlocked[6] === 0 &&
            totalsUnlocked["2↑"] === 0 &&
            totalsUnlocked["3↑"] === 0 &&
            lockCount < rollCount &&
            !flagToEndRoll
          ) {
            die.isLocked = true;
            flagToEndRoll = true;
            continue;
          }
        }

        if (goingLo) {
          if (value === 1 || value === 2 || value === "3↓" || value === "2↓") {
            die.isLocked = true;
            continue;
          } else if (rollCount >= 4 && (value === 3 || value === "1↓")) {
            die.isLocked = true;
            continue;
          } else if (
            value === 3 &&
            totalsUnlocked[1] === 0 &&
            totalsUnlocked[2] === 0 &&
            totalsUnlocked["2↓"] === 0 &&
            totalsUnlocked["3↓"] === 0 &&
            lockCount < rollCount &&
            !flagToEndRoll
          ) {
            die.isLocked = true;
            flagToEndRoll = true;
            continue;
          }
        }

        if (rollCount === 5) {
          die.isLocked = true;
          continue;
        }
      }
    }

    setDice(newDice);
  }

  // FUNCTIONS ///////////////////////////////////////////////////////
  function rollDice() {
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
        } else if (!die.isPermLocked) {
          return {
            ...die,
            value: Math.ceil(Math.random() * 6),
          };
        }
        return die;
      })
    );
  }

  function messageText() {
    if (!gameIsOver) {
      return `${
        playerTurn === 1 ? "p1" : playerTurn === 2 ? "p2" : ""
      } roll: ${rollCount}/5`;
    }
    if (gameIsOver && p1Score === p2Score) {
      return "tie game!";
    }
    if (gameIsOver && p1Score > p2Score) {
      return "p1 wins!";
    }

    return "p2 wins!";
  }

  function unlockDice() {
    setDice((oldDice) =>
      oldDice.map((die) => ({ ...die, isLocked: false, isPermLocked: false }))
    );
  }

  function handleDiceClick(id) {
    if (!gameIsStarted || betweenRound) {
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
      return "again!";
    } else if (
      roundCount === totalRounds &&
      playerTurn === 2 &&
      (allDiceLocked || rollFive)
    ) {
      return "finish!";
    } else if (!gameIsStarted) {
      return "start";
    } else if (allDiceLocked || rollFive) {
      return "end";
    } else {
      return "roll";
    }
  }

  function startNewGame() {
    handleDiceSpinAnimation();
    setDice(generateDice);
    setGameState({
      p1Score: 0,
      p2Score: 0,
      masterCount: 0,
      betweenRound: false,
    });
    setNpcState((prev) => ({ ...prev, hasRolled: false, hasLocked: true }));
  }

  function handleDiceSpinAnimation() {
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 200);
  }

  // RETURN //////////////////////////////////////////////////
  return (
    <div className="App">
      {showMenu && <Settings />}
      <Header
        p1Score={p1Score}
        p2Score={p2Score}
        roundCount={roundCount}
        playerTurn={playerTurn}
        totalRounds={totalRounds}
        menuClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      <div>
        <p className="round-info">{messageText()}</p>
        <div className="dice-container">
          {dice.map((die) => (
            <Dice
              key={die.id}
              value={
                gameIsOver && p1Score === p2Score
                  ? "🤝"
                  : gameIsOver
                  ? "🎉"
                  : die.value
              }
              isLocked={die.isLocked}
              isPermLocked={die.isPermLocked}
              isSpinning={isSpinning}
              clicked={() => {
                handleDiceClick(die.id);
              }}
              isHilo={die.isHilo}
              gameIsOver={gameIsOver}
            />
          ))}
        </div>
      </div>
      <button
        className="button"
        onClick={!gameIsOver ? handleButton : startNewGame}
        disabled={
          ((!betweenRound && lockCount < rollCount) ||
            (rollFive && !allDiceLocked)) &&
          !gameIsOver
        }
      >
        {getButtonText()}
      </button>
      <Npc npc={npcIsActive} gameState={gameState} dice={dice} />
    </div>
  );
}

export default App;
