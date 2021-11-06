import './index.css'
import html from "../index.html";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { picturePopup, config, formAdd, formEdit, profileName, profileOccupation, editButton, addButton, picturesContainer, pictureTemplate } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';

//API
const api = new Api ({
  url: 'https://nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: 'e988ea36-545d-4f3e-92ac-906bbdf6b61d',
    'Content-Type': 'application/json'
  }
})

api.getAllData()
  .then(([userData, cardList]) => {
    // profileId = userData._id;
    // userInfo.setUserInfo(userData)
    cardsSection.addItem(cardsSection.renderCard(cardList))
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });
//Validation
const formAddValidation = new FormValidator(config, formAdd);
const formEditValidation = new FormValidator(config, formEdit);
formEditValidation.enableValidation();
formAddValidation.enableValidation();
//userinfo
const userInfo = new UserInfo (profileName, profileOccupation);
//popupOverlay
const popupWithImage = new PopupWithImage(picturePopup);
popupWithImage.setEventListeners();
//popupEdit
const popupWithFormEdit = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
  popupWithFormEdit.close();
})

editButton.addEventListener('click', () => {
  popupWithFormEdit.open();
  formEditValidation.disableSubmitButton();
});

popupWithFormEdit.setEventListeners();
//popupAddCard
const popupWithFormAdd = new PopupWithForm('.popup_type_add', (data) => {
  cardsSection.addItem(createCard(data));
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
  console.log(item)
  const elementData = cardNew.createCard();
  return elementData;
}

const cardsSection = new Section ({
  renderer: (cardListItem) => {
    cardsSection.addItem(createCard(cardListItem));
  }
}, picturesContainer);

