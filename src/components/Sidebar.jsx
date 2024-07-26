import avatar from "../assets/user__avatar.png";
import "../blocks/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Basic Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default Sidebar;
