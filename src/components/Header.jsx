import "../blocks/header.css";
import logo from "../assets/wtwr__logo.svg";
import avatar from "../assets/user__avatar.png";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterUser,
  handleLoginUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" alt="logo" src={logo} />
        </Link>

        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__add-clothes-btn"
              type="button"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser}</p>
                {currentUser.avatar ? (
                  <img
                    src={avatar}
                    alt="Terrence Tegegne"
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.name.charAt(0).toUpperCase() || ""}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-box">
            <button className="header__register" onClick={handleRegisterUser}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginUser}>
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
