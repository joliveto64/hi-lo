export default function Dice(props) {
  return (
    <span
      className={`die ${props.isLocked ? "locked click" : ""} ${
        props.isSpinning ? "roll" : ""
      }`}
      onClick={props.clicked}
    >
      {props.value}
    </span>
  );
}
