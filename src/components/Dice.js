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
    isLocked ? "locked click" : "",
    isSpinning ? "roll" : "",
    isPermLocked ? "perm-locked" : "",
    isHilo && !gameIsOver ? "hilo" : "",
  ];

  const className = classList.join(" ");

  return (
    <span className={className} onClick={clicked}>
      {isHilo && value != "↑↓" && <span className="x">x</span>}
      {value}
    </span>
  );
}
