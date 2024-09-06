import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";

const EditProfileModal = ({ onClose, isOpen, handleEditProfile }) => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
  };

  const currentUser = useContext(CurrentUserContext);

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
        id="name"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="avatar" className="modal__label">
        Avatar*
      </label>
      <input
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Avatar Url"
        value={data.avatar}
        onChange={handleChange}
        required
        className="modal__input"
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
