import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useState, useEffect, useCallback } from "react";

const EditProfileModal = ({ onClose, isOpen, handleEditProfile }) => {
  /*const [data, setData] = useState({
    name: "",
    avatar: "",
  }); */

  function handleChangeAndResetForm() {
    const [value, setValue] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setValue({ ...value, [name]: value });
    };

    const resetForm = useCallback(
      (newValue = {}) => {
        setValue(newValue);
      },
      [setValue]
    );

    return {
      value,
      setValue,
      handleChange,
      resetForm,
    };
  }

  const { value, setValue, handleChange, resetForm } = handleChangeAndResetForm;

  const handleSubmit = () => {
    handleEditProfile(value, resetForm);
  };

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
  };*/

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValue({ name: currentUser?.name, avatar: currentUser?.avatar });
  }, [isOpen, setValue, currentUser]);

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
