export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscCloseBinded = this._handleEscClose.bind(this)
  }

  open() {
    this._popupElement.classList.add('popup_status_opened');
    document.addEventListener('keydown', this._handleEscCloseBinded);
  }

  close() {
    this._popupElement.classList.remove('popup_status_opened');
    document.removeEventListener('keydown', this._handleEscCloseBinded);
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    })
    this._popupElement.querySelector('.overlay').addEventListener('click', (event) => {
      this._handleOverlayClose(event);
    })
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  renderLoading(isLoading, element, defaultText) {
    if (isLoading) {
      element.textContent = "Сохранение...";
    }
    else {
      element.textContent = defaultText;
    }
  }
}
