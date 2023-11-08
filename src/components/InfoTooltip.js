import closeButton from "../images/close-button.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.popupState ? "popup__visible" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Close"
          className="popup__close-button"
          onClick={props.closePopup}
        >
          <img
            src={closeButton}
            alt="Logo de botón de cerrar"
            onClick={props.onClose}
          />
        </button>
        <div
          className={`popup__infotooltip-image_status_${
            props.mode ? "success" : "failure"
          }`}
        ></div>
        <h3 className="popup__title-message">{props.message.message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
