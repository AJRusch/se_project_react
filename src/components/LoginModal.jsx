import { Link } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({
  handleLogin,
  isOpen,
  onClose,
  handleToggleRegisterOrLogin,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
  };

  return (
    <ModalWithForm
      title="Log In"
      type="form"
      buttonText={"Log In"}
      redirectText={"or Sign Up"}
      onClose={onClose}
      isOpen={isOpen}
      handleLogin={handleLogin}
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
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
        className="modal__input"
      />
    </ModalWithForm>
  );
};

export default LoginModal;
