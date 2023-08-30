import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dice from "./components/Dice";
import Settings from "./components/Settings";
import Welcome from "./components/Welcome";
import { db } from "./firebase.js";
import { set, ref, onValue } from "firebase/database";
import {
  generateDice,
  keepDie,
  handleDiceSpinAnimation,
  rollDice,
  unlockDice,
  calculateScore,
  handleDiceClick,
} from "./utils";

function App() {
  // STATE INITIALIZATION /////////////////////////////////
  const [showSettings, setShowSettings] = useState(false);
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [npcState, setNpcState] = useState({
    hasRolled: false,
    hasLocked: true,
    npcIsActive: false,
  });
  const [dice, setDice] = useState(generateDice);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameState, setGameState] = useState({
    p1Score: 0,
    p2Score: 0,
    masterCount: 0,
    betweenRound: false,
  });
  const { masterCount, p1Score, p2Score, betweenRound } = gameState;
  const { hasRolled, hasLocked, npcIsActive } = npcState;

  // CONSTANTS/DERIVED STATES ///////////////////////////////////////
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

  // MAIN LOGIC FOR BUTTON CLICK //////////////////////////////////////////
  function handleButton() {
    handleDiceSpinAnimation(setIsSpinning);
    const score = calculateScore(dice);

    if (betweenRound) {
      rollDice(setDice);
      setGameState((prev) => ({ ...prev, betweenRound: false }));
      return;
    }

    if (allDiceLocked && !betweenRound) {
      unlockDice(setDice);
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
      rollDice(setDice);
    }
  }

  // FIREBASE STUFF /////////////////////////////////////////////////////
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
        handleDiceSpinAnimation(setIsSpinning);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  // NPC STUFF ///////////////////////////////////////////////////////////
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
        keepDie(dice, setDice, rollCount, lockCount);
        setNpcState((prev) => ({ ...prev, hasLocked: true, hasRolled: false }));
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [npcIsActive, playerTurn, allDiceLocked, hasRolled]);

  // FUNCTIONS ///////////////////////////////////////////////////////
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

  function startNewGame() {
    handleDiceSpinAnimation(setIsSpinning);
    setDice(generateDice);
    setGameState({
      p1Score: 0,
      p2Score: 0,
      masterCount: 0,
      betweenRound: false,
    });
    setNpcState((prev) => ({ ...prev, hasRolled: false, hasLocked: true }));
  }

  function resetToWelcomeScreen() {
    startNewGame();
    setIsOnline(false);
    setNpcState((prev) => ({ ...prev, npcIsActive: false }));
    setWelcomeScreen(true);
    setShowSettings(false);
  }

  // RETURN //////////////////////////////////////////////
  return (
    <div className="App">
      {welcomeScreen && (
        <Welcome
          clicked={(name) => {
            if (name === "single") {
              setNpcState((prev) => ({ ...prev, npcIsActive: true }));
            } else if (name === "online") {
              setIsOnline(true);
            }
            setWelcomeScreen(false);
          }}
        />
      )}
      {showSettings && (
        <Settings
          menuClick={() => {
            setShowSettings(!showSettings);
          }}
          welcomeScreen={welcomeScreen}
          resetToWelcomeScreen={resetToWelcomeScreen}
        />
      )}
      <Header
        p1Score={p1Score}
        p2Score={p2Score}
        roundCount={roundCount}
        playerTurn={playerTurn}
        totalRounds={totalRounds}
        menuClick={() => {
          setShowSettings(!showSettings);
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
                handleDiceClick(die.id, gameIsStarted, betweenRound, setDice);
              }}
              isHilo={die.isHilo}
              gameIsOver={gameIsOver}
            />
          ))}
        </div>
      </div>
      <button
        className="button"
        onClick={() => {
          if (!gameIsOver) {
            handleButton();
          } else {
            startNewGame(setDice, setGameState, setNpcState);
          }
        }}
        disabled={
          ((!betweenRound && lockCount < rollCount) ||
            (rollFive && !allDiceLocked)) &&
          !gameIsOver
        }
      >
        {getButtonText()}
      </button>
    </div>
  );
}

export default App;
