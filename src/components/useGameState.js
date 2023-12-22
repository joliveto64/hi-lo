import { useState } from "react";
import { generateDice } from "../utils";

export default function useGameState() {
  const [showSettings, setShowSettings] = useState(false);
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  let [modalActive, setModalActive] = useState(false);
  const [npcState, setNpcState] = useState({
    hasRolled: false,
    hasLocked: true,
    npcIsActive: false,
  });
  const [dice, setDice] = useState(generateDice());
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameState, setGameState] = useState({
    p1Score: 0,
    p2Score: 0,
    masterCount: 0,
    betweenRound: false,
  });

  const { masterCount, p1Score, p2Score, betweenRound } = gameState;
  const { hasRolled, hasLocked, npcIsActive } = npcState;

  // DERIVED STATE
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

  return {
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
  };
}
