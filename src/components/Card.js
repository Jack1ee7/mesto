import { picturePopup } from "../utils/constants.js";
// import Popup from "./Popup.js";

export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.Link;
    this._title = data.Title;
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
  // _openPicturePopupHandler() {
  //   // this._picturePopup.querySelector('.popup__picture').src = this._link;
  //   // this._picturePopup.querySelector('.popup__picture').alt = this._title;
  //   // this._picturePopup.querySelector(".popup__picture-caption").textContent = this._title;
  //   this._cardImage.addEventListener('click', () => this._handleOpenPicture(this._link, this._title);
  // }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.pictures__like-button');
    this._element.querySelector('.pictures__image').src = this._link;
    this._element.querySelector('.pictures__title').textContent = this._title;
    this._element.querySelector('.pictures__image').alt = this._title;
    this._setEventListeners();
    return this._element;
  }
}
