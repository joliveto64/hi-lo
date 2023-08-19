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

export { generateDice };
