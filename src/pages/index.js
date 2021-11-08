import './index.css'
import html from "../index.html";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { popupAddSubmitButton, popupDeleteSubmitButton, popupEditSubmitButton, popupAvatarSubmitButton ,picturePopup, config, formAdd, formEdit, formAvatar, profileName, profileOccupation, profileAvatar, editButton, addButton, avatarButton, picturesContainer, pictureTemplate } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js";

import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';

//API
const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: 'e988ea36-545d-4f3e-92ac-906bbdf6b61d',
    'Content-Type': 'application/json'
  }
})

api.getAllData()
  .then(([userData, cardList]) => {
    // profileId = userData._id;
    userInfo.setUserInfo(userData)
    userInfo.setUserAvatar(userData)
    cardList.reverse();
    cardsSection.renderCard(cardList)
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });

//userinfo
const userInfo = new UserInfo (profileName, profileOccupation, profileAvatar);

//popupOverlay
const popupWithImage = new PopupWithImage(picturePopup);
popupWithImage.setEventListeners();

//popupEdit
const popupWithFormEdit = new PopupWithForm('.popup_type_edit', (data) => {
  popupWithFormEdit.renderLoading(true, popupEditSubmitButton)
  api.sendProfileInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
      popupWithFormEdit.renderLoading(false, popupEditSubmitButton, "Сохранить")
    })
    .finally(() => {
      popupWithFormEdit.close()
      popupWithFormEdit.renderLoading(false, popupEditSubmitButton, "Сохранить")
  });
})

editButton.addEventListener('click', () => {
  popupWithFormEdit.open();
  formEditValidation.disableSubmitButton();
});

popupWithFormEdit.setEventListeners();

//popupAddCard
const popupWithFormAdd = new PopupWithForm('.popup_type_add', (data) => {
  popupWithFormAdd.renderLoading(true, popupAddSubmitButton)
  api.sendNewCard(data)
    .then((item) => {
      cardsSection.addItem(createCard(item));
    })
    .catch((err) => {
      popupWithFormAdd.renderLoading(false, popupAddSubmitButton, "Создать")
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      popupWithFormAdd.close();
      popupWithFormAdd.renderLoading(false, popupAddSubmitButton, "Создать")
    });
})

addButton.addEventListener('click', () => {
  popupWithFormAdd.open();
  formAddValidation.disableSubmitButton();
});

popupWithFormAdd.setEventListeners();

//popupAvatar
const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
  popupAvatar.renderLoading(true, popupAvatarSubmitButton)
  api.sendAvatar(data).then(() => {
    userInfo.setUserAvatar(data);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
    popupAvatar.renderLoading(false, popupAvatarSubmitButton, "Сохранить")
  })
  .finally(() => {
    popupAvatar.close();
    popupAvatar.renderLoading(false, popupAvatarSubmitButton, "Сохранить")
  });
})

avatarButton.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarValidation.disableSubmitButton();
})

popupAvatar.setEventListeners();

//popupDeleteCard
const popupDelete = new PopupDelete('.popup_type_delete', (id) => {
  popupDelete.renderLoading(true, popupDeleteSubmitButton)
  api.deleteCard(id)
    // .then(() => {
    //   document.getElementById(id).remove()
    //   popupDelete.close();
    // })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
      popupDelete.renderLoading(false, popupDeleteSubmitButton, "Да")
    })
    .finally(() => {
      document.getElementById(id).remove()
      popupDelete.close();
      popupDelete.renderLoading(false, popupDeleteSubmitButton, "Да")
    })
});
popupDelete.setEventListeners();

//-------------------------
function handleCardClick(link, title) {
  popupWithImage.open(link, title);
}

function handleOpenDelete(id) {
  popupDelete.open(id);
}

function createCard(item) {
  const cardNew = new Card(item, pictureTemplate, api, handleCardClick, handleOpenDelete);
  const elementData = cardNew.createCard();
  return elementData;
}

const cardsSection = new Section ({
  renderer: (cardListItem) => {
    cardsSection.addItem(createCard(cardListItem));
  }
}, picturesContainer);

//Validation
const formAddValidation = new FormValidator(config, formAdd);
const formEditValidation = new FormValidator(config, formEdit);
const formAvatarValidation = new FormValidator(config, formAvatar);
formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();
