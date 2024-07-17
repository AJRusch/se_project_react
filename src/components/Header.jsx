import "../blocks/header.css";
import logo from "../assets/wtwr__logo.svg";
import avatar from "../assets/user__avatar.png";
import ToggleSwitch from "./ToggleSwitch";

function Header({ onAddBtnClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <img className="header__logo" alt="logo" src={logo} />
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={onAddBtnClick}
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;