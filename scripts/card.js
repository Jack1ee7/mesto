import { showPopup, picturePopup } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._title = data.title;
    this._templateSelector = templateSelector
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  }

  _likeToggle() {
    this._element.querySelector(".pictures__like-button").classList.toggle("pictures__like-button_status_active");
  };

  _openPicturePopupHandler() {
    document.querySelector('.popup__picture').src = this._link;
    document.querySelector('.popup__picture').alt = this._title;
    document.querySelector(".popup__picture-caption").textContent = this._title;
    showPopup(picturePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.pictures__like-button').addEventListener('click', () => {
      this._likeToggle()
    })
    this._element.querySelector('.pictures__delete-button').addEventListener('click', () => {
      this._element.remove();
    })
    this._element.querySelector('.pictures__image').addEventListener('click', () => {
      this._openPicturePopupHandler()
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.pictures__image').src = this._link;
    this._element.querySelector('.pictures__title').textContent = this._title;
    this._element.querySelector('.pictures__image').alt = this._title;
    return this._element;
  }
}
