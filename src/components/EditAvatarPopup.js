import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Cambiar foto de perfil"
      buttonValue="Editar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          id="url-input-avatar"
          className="popup__input"
          name="link"
          placeholder="Enlace a la imagen"
          required
          ref={avatarInput}
        />
        <span className="popup__input-error url-input-error">
          Por favor, introduce una dirección web.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
