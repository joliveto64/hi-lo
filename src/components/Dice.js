export default function Dice({
  isHilo,
  isLocked,
  isPermLocked,
  value,
  isSpinning,
  clicked,
}) {
  const classList = [
    "die",
    isLocked ? "locked click" : "",
    isSpinning ? "roll" : "",
    isPermLocked ? "perm-locked" : "",
    isHilo ? "hilo" : "",
    isHilo && isLocked ? "hilo-locked" : "",
  ];

  const className = classList.join(" ");

  return (
    <span className={className} onClick={clicked}>
      {value}
    </span>
  );
}
