import ItemCard from "./ItemCard";
import "../blocks/clothingItems.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes__menu">
        <p className="clothes-section-items">Your Items</p>
        <button
          className="clothes__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards__list">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
