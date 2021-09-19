const container = document.querySelector(".page");
const pictureTemplate = container.querySelector("#pictureCard").content; //Card template
const picturesContainer = container.querySelector(".pictures__grid");
const picturePopup = container.querySelector('.popup_type_picture');
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
editPopup.querySelector(".popup__close-button").addEventListener("click", function () {
  //закрытие
  closePopup(editPopup);
});
editButton.addEventListener("click", function () {
  showPopup(editPopup);
});

//отображение попапа add
const addButton = container.querySelector(".profile__add-button");
const addPopup = container.querySelector(".popup_type_add");
addPopup.querySelector(".popup__close-button").addEventListener("click", function () {
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
  if (nameInput.value !== "" && jobInput.value !== "") {
    editName.textContent = nameInput.value; // Вставьте новые значения с помощью textContent.
    editJob.textContent = jobInput.value;
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

//добавление карточки
function addCard(data) {
  const card = pictureTemplate.querySelector(".pictures__item").cloneNode(true);
  card.querySelector(".pictures__image").src = data.link;
  card.querySelector(".pictures__image").alt = data.title;
  card.querySelector(".pictures__title").textContent = data.title;
  card.querySelector(".pictures__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("pictures__like-button_status_active");
  });
  card.querySelector('.pictures__delete-button').addEventListener('click', function () { //удаление карточки
    card.remove();
  })
  card.querySelector(".pictures__image").addEventListener('click', function () { //открытие попапа по клику на картинку
    showPopup(picturePopup);
    picturePopup.querySelector('.popup__picture').src = data.link;
    picturePopup.querySelector(".popup__picture-caption").textContent = data.title;
  })
  return card;
}
function renderCard(card) {
  picturesContainer.prepend(card);
}

initialCards.forEach(function (Element) {
  renderCard(addCard(Element));
});

// обработчик «отправки» формы add
function addCardSubmit(evt) {
  evt.preventDefault();
  let addInputs = {
    title: titleInput.value,
    link: linkInput.value
  }
  if (addInputs.link !== "" && addInputs.title !== "") {
    renderCard(addCard(addInputs));
    titleInput.value = '';
    linkInput.value = '';
    closePopup(addPopup);
  }
}

formAdd.addEventListener("submit", addCardSubmit);

const popupList = [picturePopup, editPopup, addPopup];
const closeAll = (popups) => {
  popups.forEach((element) => {
    closePopup(element);
  });
};
document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    closeAll(popupList);
  }
});

const overlayList = Array.from(container.querySelectorAll('.overlay'));
overlayList.forEach(element => {
  element.addEventListener('click', function () {
    closeAll(popupList);
  });
});
