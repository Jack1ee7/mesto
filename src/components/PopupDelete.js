import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._form = this._popupElement.querySelector('.popup__form');
    this._deleteButton = this._popupElement.querySelector('.popup__form-submit-button')
  };

  close() {
    super.close();
  };

  open(id) {
    super.open();
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleDelete(this._id);
    });
  };
};
