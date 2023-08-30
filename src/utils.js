import { hiLoDieArray, hiTableData, loTableData } from "./data";

function generateDice() {
  let diceArray = Array.from({ length: 5 }).map((element, index) => {
    return {
      value: "?",
      isLocked: false,
      isPermLocked: false,
      id: index,
      isHilo: false,
    };
  });

  diceArray.push({
    value: "↑↓",
    isLocked: false,
    isPermLocked: false,
    id: 5,
    isHilo: true,
  });

  return diceArray;
}

function rollDice(setDice) {
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

function handleDiceClick(id, gameIsStarted, betweenRound, setDice) {
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

function keepDie(dice, setDice, rollCount, lockCount) {
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
    totals["3↓"] * 10 +
    totalsPermLocked["3↓"] * 20;

  let hiScore =
    totals[4] +
    totals[5] * 3 +
    totalsPermLocked[5] * 6 +
    totals[6] * 5 +
    totalsPermLocked[6] * 10 +
    totals["2↑"] * 3 +
    totalsPermLocked["2↑"] * 6 +
    totals["3↑"] * 10 +
    totalsPermLocked["3↑"] * 20;

  if (loScore >= hiScore) {
    goingLo = true;
  } else {
    goingHi = true;
  }

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

function handleDiceSpinAnimation(setIsSpinning) {
  setIsSpinning(true);

  setTimeout(() => {
    setIsSpinning(false);
  }, 200);
}

function unlockDice(setDice) {
  setDice((oldDice) =>
    oldDice.map((die) => ({ ...die, isLocked: false, isPermLocked: false }))
  );
}
function calculateScore(dice) {
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

export {
  generateDice,
  keepDie,
  handleDiceSpinAnimation,
  rollDice,
  unlockDice,
  calculateScore,
  handleDiceClick,
};
