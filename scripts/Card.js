import { showPopup, picturePopup } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._title = data.title;
    this._templateSelector = templateSelector
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
      this._openPicturePopupHandler();
    })
  }

  _openPicturePopupHandler() {
    document.querySelector('.popup__picture').src = this._link;
    document.querySelector('.popup__picture').alt = this._title;
    document.querySelector(".popup__picture-caption").textContent = this._title;
    showPopup(picturePopup);
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.pictures__like-button');
    this._setEventListeners();
    this._element.querySelector('.pictures__image').src = this._link;
    this._element.querySelector('.pictures__title').textContent = this._title;
    this._element.querySelector('.pictures__image').alt = this._title;
    return this._element;
  }
}
