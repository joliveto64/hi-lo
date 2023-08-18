export default function Dice(props) {
  return (
    <span
      className={`die ${props.isLocked ? "locked click" : ""}`}
      onClick={props.clicked}
    >
      {props.value}
    </span>
  );
}
