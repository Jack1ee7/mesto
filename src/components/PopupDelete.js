import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDeleta = handleDelete;
    this._form = this._popupElement.querySelector('.popup__form');
    this._deleteButton = this._popupElement.querySelector('.popup__form-submit-button')
  };

  close() {
    super.close();
  };

  // _getInputValues() {
  //   this._data = {};
  //   this._inputList.forEach(input => this._data[input.name] = input.value);
  //   return this._data;
  // };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleDelete();
    });
  };
};
