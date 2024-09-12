import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useState, useEffect, useCallback } from "react";

const EditProfileModal = ({ onClose, isOpen, handleEditProfile }) => {
  const [value, setValue] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const resetForm = useCallback(
    (newValue = {}) => {
      setValue(newValue);
    },
    [setValue]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(value, resetForm);
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setValue({ name: currentUser?.name, avatar: currentUser?.avatar });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      onClose={onClose}
      type="form"
      isOpen={isOpen}
      buttonText={"Save changes"}
      handleEditProfile={handleEditProfile}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        id="name-edit"
        name="name"
        placeholder="Name"
        value={value.name || ""}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="avatar" className="modal__label">
        Avatar*
      </label>
      <input
        type="url"
        id="avatar-edit"
        name="avatar"
        placeholder="Avatar Url"
        value={value.avatar || ""}
        onChange={handleChange}
        required
        className="modal__input"
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
