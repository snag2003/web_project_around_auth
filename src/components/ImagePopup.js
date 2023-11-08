import closeButton from "../images/close-button.svg";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_open-image ${
        props.isOpen ? "popup__visible" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="popup__open-image">
        <button className="popup__close-button">
          <img
            src={closeButton}
            alt="Logo de botón de cerrar"
            onClick={props.onClose}
          />
        </button>
        <img className="popup__image" src={props.link} alt={props.name} />
        <h2 className="popup__image-subtitle">{props.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
