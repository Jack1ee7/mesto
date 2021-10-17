import './index.css'
import html from "../index.html";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import { initialCards } from "../components/initial-cards.js";
import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-submit-button",
  inactiveButtonClass: "popup__form-submit-button_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_status_visible",
};

const container = document.querySelector(".page");
const pictureTemplate = ("#pictureCard"); //Card template
const picturesContainer = (".pictures__grid");
export const picturePopup = ('.popup_type_picture');
// Находим форму в DOM
const formEdit = container.querySelector(".popup__form_type_edit");
const formAdd = container.querySelector('.popup__form_type_add');
// Находим поля формы edit в DOM
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("occupation");
// Находим поля формы add в DOM
const titleInput = document.getElementById("title");
const linkInput = document.getElementById("link");
// Выберите элементы, куда должны быть вставлены значения полей. edit
const profile = container.querySelector(".profile__info-text");
const profileName = (".profile__name");
const profileOccupation = (".profile__occupation");
const editButton = container.querySelector(".profile__edit-button");
const addButton = container.querySelector(".profile__add-button");

const formAddValidation = new FormValidator(config, formAdd);
const formEditValidation = new FormValidator(config, formEdit);

const userInfo = new UserInfo (profileName, profileOccupation);
const popupWithImage = new PopupWithImage(picturePopup);
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
  popupWithFormEdit.close();
  formEditValidation.disableSubmitButton();
})

editButton.addEventListener('click', () => {
  popupWithFormEdit.open();
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add', (data) => {
  const cardNew = new Card(data, pictureTemplate, handleCardClick);
  const elementData = cardNew.createCard();
  renderCard.addItem(elementData);
  popupWithFormAdd.close();
  formAddValidation.disableSubmitButton();
})

addButton.addEventListener('click', () => {
  popupWithFormAdd.open();
});

popupWithFormAdd.setEventListeners();

function handleCardClick(link, title) {
  popupWithImage.open(link, title);
}

const renderCard = new Section ({
  cardList: initialCards,
  renderer: (cardListItem) => {
    const cardNew = new Card(cardListItem, pictureTemplate, handleCardClick);
    const elementData = cardNew.createCard();
    renderCard.addItem(elementData);
  }
}, picturesContainer);

renderCard.renderCard();


formEditValidation.enableValidation();
formAddValidation.enableValidation();
