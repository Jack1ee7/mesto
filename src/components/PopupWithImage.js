import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPictureContainer = this._popupElement.querySelector('.popup__picture');
    this._popupCaptionContainer = this._popupElement.querySelector('.popup__picture-caption');
  }

  open(link, title) {
    this._popupPictureContainer.src = link;
    this._popupPictureContainer.alt = title;
    this._popupCaptionContainer.textContent = title;
    super.open();
  }
}
