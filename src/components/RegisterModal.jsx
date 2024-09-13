import { useState } from "react";
import { Link } from "react-router-dom";
import ModalWithForm from "./ModalWithForm";
import "../blocks/registerModal.css";

function RegisterModal({
  isOpen,
  onClose,
  handleRegistration,
  setActiveModal,
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
      redirectTextClick={() => setActiveModal("login")}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email-register" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        id="email-register"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="password-register" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        id="password-register"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="name-register" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        id="name-register"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="avatar-register" className="modal__label">
        Avatar Url*
      </label>
      <input
        type="url"
        id="avatar-register"
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
