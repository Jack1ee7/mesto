import { picturePopup } from "../utils/constants.js";

export class Card {
  constructor(data, templateSelector, api, handleCardClick, handleOpenDelete) {
    this._api = api;
    this._data = data;
    this._link = data.link;
    this._title = data.name;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._myId = "93504bed1928e5fb6f3dcc10";
    this._templateSelector = templateSelector;
    this._picturePopup = document.querySelector(picturePopup);
    this._handleCardClick = handleCardClick;
    this._handleOpenDelete = handleOpenDelete;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".pictures__item").cloneNode(true); //!
    return cardElement;
  }

  _toggleLike() {
    if (!(this._likeButton.classList.contains('pictures__like-button_status_active'))) {
      this._api.addLike(this._cardId)
        .then((data) => {
          this._likeButton.classList.add('pictures__like-button_status_active');
          this._likeCounter.textContent = data.likes.length;
        })
      } else {
      this._api.removeLike(this._cardId)
        .then((data) => {
          this._likeButton.classList.remove('pictures__like-button_status_active');
          this._likeCounter.textContent = data.likes.length;
        })
      }
  };

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })
    this._element.querySelector('.pictures__delete-button').addEventListener('click', (event) => {
      this._handleOpenDelete(event.target.closest('.pictures__item').id);
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
