import { showPopup, picturePopup } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._title = data.title;
    this._templateSelector = templateSelector
  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _removeCard() {
    this._cardElement.remove();
  }

  _likeToggle() {
    this._cardElement.querySelector('.pictures__like-button').classList.toggle('pictures__like-button_status_active');
  }

  _openPicturePopupHanler() {
    document.querySelector('.popup__picture').src = this._link;
    document.querySelector('.popup__picture').alt = this._title;
    document.querySelector(".popup__picture-caption").textContent = this._title;
    showPopup(picturePopup);
  }

  _setEventListeners() {
    this._cardElement.querySelector(".pictures__delete-button").addEventListener("click", (event) => {
      this._removeCard(event);
    });
    this._cardElement.querySelector(".pictures__image").addEventListener("click", () => {
      this._openPicturePopupHanler(this._link, this._title);
    });
    this._cardElement.querySelector('.pictures__like-button').addEventListener('click', () => {
      this._likeToggle()
    });
  }
  createCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector('.pictures__image').src = this._link;
    this._cardElement.querySelector('.pictures__title').textContent = this._title;
    this._cardElement.querySelector('.pictures__image').alt = this._title;
    return this._cardElement;
  }
}
