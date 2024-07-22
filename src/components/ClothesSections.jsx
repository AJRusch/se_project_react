import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/clothingItems.css";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes__menu">
        <p className="clothes-section-items">Your Items</p>
        <button className="clothes__add-btn">+ Add New</button>
      </div>
      <ul className="clothes-section__cards__list">
        {defaultClothingItems
          //.filter((item) => {
          // return item.weather === weatherData.type;
          // })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                //pass as prop
                //onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
