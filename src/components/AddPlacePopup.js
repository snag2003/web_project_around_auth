import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlaceSubmit({ name, link });
  }

  return (
    <PopupWithForm
      name="add"
      title="Nuevo Lugar"
      value="Crear"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue="Crear"
    >
      <label className="popup__field">
        <input
          type="text"
          id="title-input"
          className="popup__input"
          name="name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span id="name-input-error" className="popup__input-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          id="url-input"
          className="popup__input"
          name="link"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span id="link-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
