export default function Dice({
  isHilo,
  isLocked,
  isPermLocked,
  value,
  isSpinning,
  clicked,
  gameIsOver,
}) {
  const classList = [
    "die",
    isPermLocked ? "perm-locked" : "",
    isLocked ? "locked click" : "",
    isSpinning ? "roll" : "",
    isHilo && !gameIsOver ? "hilo" : "",
  ];

  const className = classList.join(" ");

  return (
    <span className={className} onClick={clicked}>
      {isHilo && value != "↑↓" && !gameIsOver && <span className="x">x</span>}
      {value}
    </span>
  );
}
