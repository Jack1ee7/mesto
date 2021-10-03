import FormValidator from "./FormValidator.js";
import { initialCards } from "./initial-cards.js";
import { Card } from "./card.js";

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
const picturesContainer = container.querySelector(".pictures__grid");
export const picturePopup = container.querySelector('.popup_type_picture');
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
const bio = container.querySelector(".profile__info-text");
const editName = bio.querySelector(".profile__name");
const editJob = bio.querySelector(".profile__occupation");

const formAddValidation = new FormValidator(config, formAdd);
const formEditValidation = new FormValidator(config, formEdit);

//открытие popup
export function showPopup(popupElement) {
  popupElement.classList.add("popup_status_opened");
  document.addEventListener('keydown', popupKeydownHandler);
  popupElement.querySelector('.overlay').addEventListener('click', closeOpenedPopup);
};

const popupKeydownHandler = (evt) => {
  if (evt.key === "Escape") {
    closeOpenedPopup();
  };
};

const closeOpenedPopup = () => {
  const openedPopup = document.querySelector('.popup_status_opened');
  closePopup(openedPopup);
}

//закрытие popup
function closePopup(popupElement) {
  popupElement.classList.remove("popup_status_opened");
  document.removeEventListener('keydown', popupKeydownHandler);
  popupElement.querySelector('.overlay').removeEventListener('click', closeOpenedPopup);
};

picturePopup.querySelector('.popup__close-button').addEventListener('click', function () {
  closePopup(picturePopup);
});



//Отображение попапа Edit
const popupEditProfile = container.querySelector(".popup_type_edit");
const editButton = container.querySelector(".profile__edit-button");
popupEditProfile.querySelector(".popup__close-button").addEventListener("click", function () {
  //закрытие
  closePopup(popupEditProfile);
});
editButton.addEventListener("click", function () {
  formEditValidation.resetState();
  showPopup(popupEditProfile);
  nameInput.value = editName.textContent;
  jobInput.value = editJob.textContent;
  // enableSubmitButton(buttonElementEditProfile, disabledButtonSelector);
});

//отображение попапа add
const addButton = container.querySelector(".profile__add-button");
const popupAddCard = container.querySelector(".popup_type_add");
popupAddCard.querySelector(".popup__close-button").addEventListener("click", function () {
  //закрытие
  closePopup(popupAddCard);
});
addButton.addEventListener("click", function () {
  showPopup(popupAddCard);
  formAdd.reset();
  formAddValidation.resetState();
});

// Обработчик «отправки» формы edit, хотя пока
// она никуда отправляться не будет
function formEditProfileSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value.
  if (nameInput.value !== "" && jobInput.value !== "") {
    editName.textContent = nameInput.value; // Вставьте новые значения с помощью textContent.
    editJob.textContent = jobInput.value;
    formEdit.reset();
    closePopup(popupEditProfile);
  };
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", formEditProfileSubmitHandler);


function createCard(data) {            // функция создания новой карточки
  const cardNew = new Card(data, pictureTemplate);
  const elementData = cardNew.createCard();
  return elementData;
}

function renderCard(card) {
  picturesContainer.prepend(card);
}

initialCards.forEach(function (Element) {
  renderCard(createCard(Element));
});

// обработчик «отправки» формы add
function addCardSubmit(evt) {
  evt.preventDefault();
  const formAddCardInputValues = {
    title: titleInput.value,
    link: linkInput.value
  };
  if (formAddCardInputValues.link !== "" && formAddCardInputValues.title !== "") {
    renderCard(createCard(formAddCardInputValues));
    formAdd.reset();
    closePopup(popupAddCard);
  }
}

formAdd.addEventListener("submit", addCardSubmit);

formEditValidation.enableValidation();
formAddValidation.enableValidation();
