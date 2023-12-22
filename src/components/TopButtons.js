export default function TopButtons(props) {
  return (
    <div className="top-buttons-container">
      <span className="quit-btn" onClick={props.handleQuitGame}>
        {props.welcomeScreen ? "" : "Quit"}
      </span>{" "}
      <span className="menu-btn" onClick={props.toggleSettings}>
        {props.showSettings ? "Close" : "Menu"}
      </span>
    </div>
  );
}
