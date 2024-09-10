import avatar from "../assets/user__avatar.png";
import "../blocks/sidebar.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Sidebar({ handleEditProfileUser, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.avatar}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <div className="sidebar__menu-container">
        <button
          handleEditProfileUser={handleEditProfileUser}
          className="sidebar__edit-info-btn"
        >
          Change profile data
        </button>
        <button handleLogout={handleLogout} className="sidebar__logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
