import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth.js";

function AroundUs(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    name: "",
  });
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name });
    setIsImagePopupOpen(true);
  }
  function closeAllPopups(evt) {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardProps) {
    api
      .deleteCard(cardProps.card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          return c._id !== cardProps.card._id;
        });
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(info) {
    api
      .editUserInfo(info)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardProps) {
    api
      .postNewCard(cardProps)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarInput) {
    api
      .editAvatar(avatarInput.avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        api
          .getInitialCards()
          .then((res) => {
            setCards(
              res.map((card) => ({
                link: card.link,
                name: card.name,
                likes: card.likes,
                _id: card._id,
                owner: card.owner,
              }))
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    const jwt = localStorage.getItem("jwt");
    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          props.setUserEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          redirect="Cerrar Sesión"
          link="/login"
          email={props.email}
          signOut={props.signOut}
        />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          cards={cards}
          onCardClick={(card) => handleCardClick(card)}
          onCardLike={(card) => handleCardLike(card)}
          onCardDelete={(card) => handleCardDelete(card)}
        ></Main>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete"
          title="¿Estás seguro?"
          buttonValue="Sí"
          onClose={closeAllPopups}
        ></PopupWithForm>
        <ImagePopup
          isOpen={isImagePopupOpen}
          link={selectedCard.link}
          name={selectedCard.name}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default AroundUs;
