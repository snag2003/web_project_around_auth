import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Editar perfil"
      buttonValue="Guardar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          id="name-input"
          className="popup__input"
          name="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          value={name ?? "Jacques Cousteau"}
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-input-error">
          Por favor, rellena este campo.
        </span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          id="category-input"
          className="popup__input"
          name="about"
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="400"
          required
          value={description ?? "Explorador"}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error category-input-error">
          Por favor, rellena este campo.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
