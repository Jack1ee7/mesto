import { picturePopup } from "../utils/constants.js";
// import Popup from "./Popup.js";

export class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete) {
    this._link = data.link;
    this._title = data.name;
    this._cardId = data.owner._id;
    this._myId = "93504bed1928e5fb6f3dcc10";
    this._templateSelector = templateSelector;
    this._picturePopup = document.querySelector(picturePopup);
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".pictures__item").cloneNode(true); //!
    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('pictures__like-button_status_active');
  };

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })
    this._element.querySelector('.pictures__delete-button').addEventListener('click', () => {
      this._removeCard();
    })
    this._element.querySelector('.pictures__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._title);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.pictures__like-button');
    this._element.querySelector('.pictures__image').src = this._link;
    this._element.querySelector('.pictures__title').textContent = this._title;
    this._element.querySelector('.pictures__image').alt = this._title;
    if (this._myId == this._cardId) {
      this._element.querySelector('.pictures__delete-button').classList.add('pictures__delete-button_status_visible');
    };
    this._setEventListeners();
    return this._element;
  }
}
