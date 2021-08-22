const container = document.querySelector(".page");
const pictureTemplate = container.querySelector("#pictureCard").content; //Card template
const picturesContainer = container.querySelector(".pictures__grid");
const picturePopup = container.querySelector('.popup_type_picture');
// Находим форму в DOM
const formEdit = container.querySelector(".popup__form_type_edit");
const formAdd = container.querySelector('.popup__form_type_add');
// Находим поля формы edit в DOM
const nameInput = document.getElementById("#inputName");
const jobInput = document.getElementById("#inputOccupation");
// Находим поля формы add в DOM
const titleInput = document.getElementById("#inputTitle");
const linkInput = document.getElementById("#inputLink");

// Выберите элементы, куда должны быть вставлены значения полей. edit
const bio = container.querySelector(".profile__info-text");
const editName = bio.querySelector(".profile__name");
const editJob = bio.querySelector(".profile__occupation");
// Выберите элементы, куда должны быть вставлены значения полей. edit

//закрытие popup
function closePopup(popupElement) {
  popupElement.classList.remove("popup_status_opened");
}

picturePopup.querySelector('.popup__close-button').addEventListener('click', function () {
  closePopup(picturePopup)
});

//открытие popup
function showPopup(popupElement) {
  popupElement.classList.add("popup_status_opened");
}

//Отображение попапа Edit
const editPopup = container.querySelector(".popup_type_edit");
const editButton = container.querySelector(".profile__edit-button");
editPopup
  .querySelector(".popup__close-button")
  .addEventListener("click", function () {
    //закрытие
    closePopup(editPopup);
  });
editButton.addEventListener("click", function () {
  showPopup(editPopup);
});

//отображение попапа add
const addButton = container.querySelector(".profile__add-button");
const addPopup = container.querySelector(".popup_type_add");
addPopup
  .querySelector(".popup__close-button")
  .addEventListener("click", function () {
    //закрытие
    closePopup(addPopup);
  });
addButton.addEventListener("click", function () {
  showPopup(addPopup);
});

// Обработчик «отправки» формы edit, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value.
  const inputs = [nameInput.value, jobInput.value];

  if (inputs[0] !== "" && inputs[1] !== "") {
    editName.textContent = inputs[0]; // Вставьте новые значения с помощью textContent.
    editJob.textContent = inputs[1];
    nameInput.value = '';
    jobInput.value = '';
    closePopup(editPopup);
  }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// добавление карточки
function addCard(linkValue, titleValue) {
  const pictureElement = pictureTemplate.querySelector(".pictures__item").cloneNode(true);
  pictureElement.querySelector(".pictures__image").src = linkValue;
  pictureElement.querySelector(".pictures__title").textContent = titleValue;
  pictureElement.querySelector(".pictures__like-button").addEventListener("click", function () {
    pictureElement.querySelector(".pictures__like-button").classList.toggle("pictures__like-button_status_active");
  });
  pictureElement.querySelector('.pictures__delete-button').addEventListener('click', function (evt) { //удаление карточки
    removeCard(evt.target);
  })
  pictureElement.querySelector(".pictures__image").addEventListener('click', function () { //открытие попапа по клику на картинку
    showPopup(picturePopup);
    picturePopup.querySelector('.popup__picture').src = linkValue;
    picturePopup.querySelector(".popup__picture-caption").textContent = titleValue;
  })
  picturesContainer.prepend(pictureElement);
}

initialCards.forEach(function (Element) {
  addCard(Element.link, Element.name);
});

// обработчик «отправки» формы add
function addCardSubmit(evt) {
  evt.preventDefault();
  const inputs = [titleInput.value, linkInput.value];
  if (inputs[0] !== "" && inputs[1] !== "") {
    addCard(inputs[1], inputs[0]);
    titleInput.value = '';
    linkInput.value = '';
    closePopup(addPopup);
  }
}
formAdd.addEventListener("submit", addCardSubmit);

//удаление карточек
function removeCard(place) {
  const pictureElement = place.parentElement;
  pictureElement.remove();
}

