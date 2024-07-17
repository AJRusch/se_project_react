import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section-items">Your Items</p>
        <button>+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
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
