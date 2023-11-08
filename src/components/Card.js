import deleteButton from "../images/delete-button.svg";
import likeButton from "../images/like-button.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_active" : ""
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <li className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
        <img src={deleteButton} alt="Logo de botón de eliminar" />
      </button>
      <div
        onClick={handleClick}
        className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
      ></div>
      <h3 className="element__title">{props.card.name}</h3>
      <div>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <img src={likeButton} alt="Logo de botón de me gusta" />
        </button>
        <p className="element__likes">{props.card.likes.length}</p>
      </div>
    </li>
  );
}

export default Card;
