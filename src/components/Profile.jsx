import Sidebar from "./Sidebar.jsx";
import ClothesSection from "./ClothesSections";
import "../blocks/profile.css";

function Profile() {}
return (
  <div className="profile">
    <section className="profile__sidebar">
      <Sidebar />
    </section>
    <section className="profile__clothes-section">
      <ClothesSection />
    </section>
  </div>
);

export default Profile;
