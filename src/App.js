import { useEffect } from "react";
import { db } from "./firebase.js";
import { set, ref, onValue } from "firebase/database";
import Header from "./components/Header";
import Dice from "./components/Dice";
import Settings from "./components/Settings";
import Welcome from "./components/Welcome";
import useGameState from "./components/useGameState.js";
import {
  generateDice,
  keepDie,
  rollDice,
  unlockDice,
  calculateScore,
  handleDiceClick,
} from "./utils";

// TODO: text size issue in landscape

function App() {
  // IMPORTED STATE
  const {
    showSettings,
    setShowSettings,
    welcomeScreen,
    setWelcomeScreen,
    isOnline,
    setIsOnline,
    flipped,
    setFlipped,
    autoRotate,
    setAutoRotate,
    modalActive,
    setModalActive,
    npcState,
    setNpcState,
    dice,
    setDice,
    isSpinning,
    setIsSpinning,
    gameState,
    setGameState,
    rollCount,
    roundCount,
    totalRounds,
    gameIsOver,
    gameIsStarted,
    rollFive,
    playerTurn,
    lockCount,
    allDiceLocked,
  } = useGameState();
  const { masterCount, p1Score, p2Score, betweenRound } = gameState;
  const { hasRolled, hasLocked, npcIsActive } = npcState;

  // FIREBASE STUFF /////////////////////////////////////////////////////
  useEffect(() => {
    const updateDatabase = async () => {
      if (isOnline) {
        const gameStateRef = ref(db, `/gameState`);
        const diceRef = ref(db, "/dice");
        await set(diceRef, dice);
        await set(gameStateRef, gameState);
      }
    };

    updateDatabase();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  // NPC Logic //////////////////////////////////////////
  useEffect(() => {
    let timeoutId;
    if (npcIsActive && playerTurn === 2 && hasLocked) {
      timeoutId = setTimeout(() => {
        handleButton();
        setNpcState((prev) => ({ ...prev, hasRolled: true, hasLocked: false }));
      }, 750);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [
    npcIsActive,
    playerTurn,
    allDiceLocked,
    hasRolled,
    dice,
    lockCount,
    rollCount,
  ]);

  // FUNCTIONS ///////////////////////////////////////////////////////
  function handleButton() {
    handleDiceSpinAnimation();
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

  function resetToWelcomeScreen() {
    startNewGame();
    setIsOnline(false);
    setNpcState((prev) => ({ ...prev, npcIsActive: false }));
    setWelcomeScreen(true);
    setShowSettings(false);
    setFlipped(false);
  }

  function toggleSettings() {
    setShowSettings(!showSettings);
  }

  function handleYes() {
    setModalActive(false);
    resetToWelcomeScreen();
  }

  function handleNo() {
    setModalActive(false);
  }

  function handleQuitGame() {
    if (!gameIsStarted) {
      handleYes();
    } else {
      setModalActive(true);
    }
  }

  function modal() {
    if (!modalActive) {
      return <></>;
    } else {
      return (
        <div className="are-you-sure">
          <h1>Are you sure?</h1>
          <div className="yes-no">
            <span className="yes" onClick={handleYes}>
              Yes
            </span>
            <span className="no" onClick={handleNo}>
              No
            </span>
          </div>
        </div>
      );
    }
  }

  function messageText() {
    if (!gameIsOver) {
      return `Roll: ${rollCount}/5`;
    }
    if (gameIsOver && p1Score === p2Score) {
      return "Tie game!";
    }
    if (gameIsOver && p1Score > p2Score) {
      return "P1 wins!";
    }

    return "P2 wins!";
  }

  function rotateScreen() {
    setAutoRotate(!autoRotate);
  }

  useEffect(() => {
    if (!npcIsActive) {
      if (playerTurn === 2 && autoRotate && !flipped) {
        setFlipped(true);
      } else if (playerTurn === 1 && autoRotate && flipped) {
        setFlipped(false);
      }
    }
  }, [autoRotate, playerTurn, flipped]);

  function setGameMode(name) {
    if (name === "single") {
      setNpcState((prev) => ({ ...prev, npcIsActive: true }));
    } else if (name === "online") {
      setIsOnline(true);
    }
    setWelcomeScreen(false);
  }

  function getButtonText() {
    if (gameIsOver) {
      return "Again!";
    } else if (
      roundCount === totalRounds &&
      playerTurn === 2 &&
      (allDiceLocked || rollFive)
    ) {
      return "Finish!";
    } else if (!gameIsStarted) {
      return "Start";
    } else if (allDiceLocked || rollFive) {
      return "End";
    } else {
      return "Roll";
    }
  }

  // RETURN //////////////////////////////////////////////
  return (
    <div className={`App ${flipped ? "flip-screen" : ""}`}>
      {modal()}
      <div className="top-buttons-container">
        <span className="quit-btn" onClick={handleQuitGame}>
          {welcomeScreen ? "" : "Quit"}
        </span>{" "}
        <span className="menu-btn" onClick={toggleSettings}>
          {showSettings ? "Close" : "Menu"}
        </span>
      </div>
      {welcomeScreen && <Welcome clicked={setGameMode} />}
      {showSettings && (
        <Settings
          rotateScreen={rotateScreen}
          autoRotate={autoRotate}
          toggleSettings={toggleSettings}
          showSettings={showSettings}
        />
      )}
      <div className="dice-button-container">
        <Header
          p1Score={p1Score}
          p2Score={p2Score}
          roundCount={roundCount}
          playerTurn={playerTurn}
          totalRounds={totalRounds}
          toggleSettings={toggleSettings}
          showSettings={showSettings}
          resetToWelcomeScreen={resetToWelcomeScreen}
          handleQuitGame={handleQuitGame}
          welcomeScreen={welcomeScreen}
          gameIsOver={gameIsOver}
          rollCount={rollCount}
          messageText={messageText}
        />
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
                handleDiceClick(
                  die.id,
                  gameIsStarted,
                  betweenRound,
                  setDice,
                  npcIsActive,
                  playerTurn
                );
              }}
              isHilo={die.isHilo}
              gameIsOver={gameIsOver}
            />
          ))}
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
            (!betweenRound && lockCount < rollCount) ||
            (rollFive && !allDiceLocked) ||
            (npcIsActive && playerTurn === 2)
          }
        >
          {getButtonText()}
        </button>
      </div>
      <div className="empty-bottom"></div>
    </div>
  );
}

export default App;
