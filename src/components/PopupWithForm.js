import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
  };

  close() {
    super.close();
    this._form.reset();
  };

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._data = {};
    this._inputList.forEach(input => this._data[input.name] = input.value);
    return this._data;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(this._getInputValues())
      this._handleFormSubmit(this._getInputValues());
    });
  };
};