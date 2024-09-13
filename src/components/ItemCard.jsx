import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";
import "../blocks/itemCard.css";
import likeActive from "../assets/likeActive.svg";
import likeInactive from "../assets/likeInactive.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (evt) => {
    evt.preventDefault();
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__name-like-container">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <img
            src={isLiked ? likeActive : likeInactive}
            alt={isLiked ? "Unliked" : "Liked"}
            className="card__like-btn"
            onClick={handleLike}
          />
        )}
      </div>

      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
