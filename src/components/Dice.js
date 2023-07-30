export default function Dice(props) {
  return (
    <span className="die" onClick={props.clicked}>
      {props.value}
    </span>
  );
}
