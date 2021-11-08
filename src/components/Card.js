import { picturePopup } from "../utils/constants.js";

export class Card {
  constructor(data, templateSelector, userId, handleCardClick, handleOpenDelete, handleLike) {
    this._data = data;
    this._link = data.link;
    this._title = data.name;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._myId = userId;
    this._templateSelector = templateSelector;
    this._picturePopup = document.querySelector(picturePopup);
    this._handleCardClick = handleCardClick;
    this._handleOpenDelete = handleOpenDelete;
    this._handleLike = handleLike;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".pictures__item").cloneNode(true); //!
    return cardElement;
  }

  addLike(data) {
    this._likeButton.classList.add('pictures__like-button_status_active');
    this._likeCounter.textContent = data.likes.length;
  }
  removeLike(data) {
    this._likeButton.classList.remove('pictures__like-button_status_active');
    this._likeCounter.textContent = data.likes.length;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike(this._likeButton)
    })
    this._element.querySelector('.pictures__delete-button').addEventListener('click', (event) => {
      this._handleOpenDelete(this._cardId);
    })
    this._element.querySelector('.pictures__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._title);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.pictures__like-button');
    this._likeCounter = this._element.querySelector('.pictures__like-counter');
    this._element.querySelector('.pictures__image').src = this._link;
    this._element.querySelector('.pictures__title').textContent = this._title;
    this._element.querySelector('.pictures__image').alt = this._title;
    this._element.id = this._cardId;
    this._likeCounter.textContent = this._data.likes.length; //обновление при загрузке кол-ва лайков

    if (this._data.likes.some(element => element._id == this._myId)) {  //проверка ставил ли я лайк на карточку, если да, то поставить активный класс лайка
      this._likeButton.classList.add('pictures__like-button_status_active');
    };

    if (this._myId == this._cardOwnerId) {
      this._element.querySelector('.pictures__delete-button').classList.add('pictures__delete-button_status_visible');
    };
    this._setEventListeners();
    return this._element;
  }
}
