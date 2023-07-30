export default function Dice(props) {
  const styles = {
    backgroundColor: props.isLocked ? "red" : "white",
  };
  return (
    <span className="die" onClick={props.clicked} style={styles}>
      {props.value}
    </span>
  );
}
