export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _hasNotInputValues() {
    return this._inputList.every((inputElement) => {
      return inputElement.value.length === 0;
    });
  }

  _disableSubmitButton (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };

  _enableSubmitButton (buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState () {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput() || this._hasNotInputValues()) {
        this._disableSubmitButton(buttonElement);
    } else {
        this._enableSubmitButton(buttonElement);
    }
  }

  _setEventListeners () {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    // const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
    this._toggleButtonState(this._inputList);
  };

  resetState() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }
}
