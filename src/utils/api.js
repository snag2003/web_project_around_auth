class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      const errorMessage = `Error: ${res.status}`;
      throw new Error(errorMessage);
    }
    return res.json();
  }

  _handleRequest(url, method, body = null) {
    const requestOptions = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
    };

    return fetch(`${this.baseUrl}${url}`, requestOptions)
      .then((response) => this._handleResponse(response))
      .catch((error) => {
        console.log(error);
      });
  }

  getInitialCards() {
    return this._handleRequest("/cards", "GET");
  }

  getUserInfo() {
    return this._handleRequest("/users/me", "GET");
  }

  editUserInfo(data) {
    return this._handleRequest("/users/me", "PATCH", {
      name: data.name,
      about: data.about,
    });
  }

  editAvatar(avatar) {
    return this._handleRequest("/users/me/avatar", "PATCH", {
      avatar: avatar,
    });
  }

  postNewCard(card) {
    return this._handleRequest("/cards", "POST", {
      name: card.name,
      link: card.link,
    });
  }

  deleteCard(cardId) {
    return this._handleRequest(`/cards/${cardId}`, "DELETE");
  }

  setCardIcons() {
    return this._handleRequest("/users/me", "GET");
  }

  cardLiked(cardId) {
    return this._handleRequest(`/cards/likes/${cardId}`, "PUT");
  }

  cardUnliked(cardId) {
    return this._handleRequest(`/cards/likes/${cardId}`, "DELETE");
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._handleRequest(
      `/cards/likes/${cardId}`,
      isLiked ? "PUT" : "DELETE"
    );
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_07",
  headers: {
    authorization: "75ae37db-e1c0-4226-9bd4-60fb735a3607",
    "Content-Type": "application/json",
  },
});

export default api;
