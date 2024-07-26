import "../blocks/itemModal.css";

function ItemModal({ activeModal, card, onClose, handleDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className=" modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => handleDeleteItem(card) && onClose}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
