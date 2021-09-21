const container = document.querySelector(".page");
const pictureTemplate = container.querySelector("#pictureCard").content; //Card template
const picturesContainer = container.querySelector(".pictures__grid");
const picturePopup = container.querySelector('.popup_type_picture');
const picturePopupImage = picturePopup.querySelector('.popup__picture');
const picturePopupCaption = picturePopup.querySelector(".popup__picture-caption");
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

//открытие popup
function showPopup(popupElement) {
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
  showPopup(popupEditProfile);
  clearValidationErrors(popupEditProfile);
  nameInput.value = editName.textContent;
  jobInput.value = editJob.textContent;
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
  clearValidationErrors(popupAddCard);
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
    disableButton(popupEditProfile);
  }
}

const disableButton = (element) => {
  const button = element.querySelector('.popup__form-submit-button');
  button.setAttribute("disabled", "disabled");
  button.classList.add('popup__form-submit-button_disabled');
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", formEditProfileSubmitHandler);


//добавление карточки
function createCard(data) {
  const card = pictureTemplate.querySelector(".pictures__item").cloneNode(true);
  const cardImage = card.querySelector(".pictures__image");
  cardImage.src = data.link;
  cardImage.alt = data.title;
  card.querySelector(".pictures__title").textContent = data.title;
  card.querySelector(".pictures__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("pictures__like-button_status_active");
  });
  card.querySelector('.pictures__delete-button').addEventListener('click', function () { //удаление карточки
    card.remove();
  });
  card.querySelector(".pictures__image").addEventListener('click', function () { //открытие попапа по клику на картинку
    showPopup(picturePopup);
    picturePopupImage.src = data.link;
    picturePopupImage.alt = data.title;
    picturePopupCaption.textContent = data.title;
  });
  return card;
}
function renderCard(card) {
  picturesContainer.prepend(card);
}

const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
    disableButton(popupAddCard);
  }
}

formAdd.addEventListener("submit", addCardSubmit);



