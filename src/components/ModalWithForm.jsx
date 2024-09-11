import "../blocks/modalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  redirectText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__btn-box">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <button className="modal__btn-redirect">{redirectText}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
