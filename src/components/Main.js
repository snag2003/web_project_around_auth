import React from "react";
import Card from "./Card.js";
import EditButton from "../images/edit-button.svg";
import AddButton from "../images/add-button.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <div className="profile">
        <div className="profile__container">
          <div
            className="profile__overlay-container"
            onClick={props.onEditAvatarClick}
          >
            <div className="profile__overlay"></div>
            <img
              className="profile__picture"
              alt="Foto del perfil"
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfileClick}
              >
                <img src={EditButton} alt="Botón de editar" />
              </button>
            </div>
            <h2 className="profile__job">{currentUser.about}</h2>
          </div>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlaceClick}>
          <img src={AddButton} alt="Botón de añadir" />
        </button>
      </div>
      <div className="elements">
        <ul className="elements__container">
          {props.cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onCardClick={() => props.onCardClick(card)}
              onCardLike={() => props.onCardLike(card)}
              onCardDelete={() => props.onCardDelete(card)}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
