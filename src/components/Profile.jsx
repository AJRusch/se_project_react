import Sidebar from "./Sidebar.jsx";
import ClothesSection from "./ClothesSections";
import "../blocks/profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileUser,
  handleLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleLogout={handleLogout}
          handleEditProfileUser={handleEditProfileUser}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
