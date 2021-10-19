import './index.css'
import html from "../index.html";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, picturePopup, config, formAdd, formEdit, profileName, profileOccupation, editButton, addButton, picturesContainer, pictureTemplate } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";



const formAddValidation = new FormValidator(config, formAdd);
const formEditValidation = new FormValidator(config, formEdit);

const userInfo = new UserInfo (profileName, profileOccupation);
const popupWithImage = new PopupWithImage(picturePopup);
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
  popupWithFormEdit.close();
})

editButton.addEventListener('click', () => {
  popupWithFormEdit.open();
  formEditValidation.disableSubmitButton();
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add', (data) => {
  createCard(data);
  popupWithFormAdd.close();
})

addButton.addEventListener('click', () => {
  popupWithFormAdd.open();
  formAddValidation.disableSubmitButton();
});

popupWithFormAdd.setEventListeners();

function handleCardClick(link, title) {
  popupWithImage.open(link, title);
}

function createCard(item) {
  const cardNew = new Card(item, pictureTemplate, handleCardClick);
  const elementData = cardNew.createCard();
  renderCard.addItem(elementData);
}

const renderCard = new Section ({
  cardList: initialCards,
  renderer: (cardListItem) => {
    createCard(cardListItem);
  }
}, picturesContainer);

renderCard.renderCard();

formEditValidation.enableValidation();
formAddValidation.enableValidation();
