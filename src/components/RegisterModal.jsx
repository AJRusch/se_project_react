import { useState } from "react";
import { Link } from "react-router-dom";
import ModalWithForm from "./ModalWithForm";
import "../blocks/registerModal.css";

function RegisterModal({
  isOpen,
  onClose,
  handleRegistration,
  handleToggleRegisterOrLogin,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((priorData) => ({
      ...priorData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClick={handleRegistration}
      onClose={onClose}
      title="Sign Up"
      type="form"
      buttonText={"Sign Up"}
      redirectText={"or Log In"}
      handleToggleRegisterOrLogin={handleToggleRegisterOrLogin}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="password" className="modal__label">
        Password*
      </label>
      <input
        type="passwprd"
        id="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
        className="modal__input"
      />
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
        Avatar Url*
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
}

export default RegisterModal;