let container = document.querySelector('.page');
let editButton = container.querySelector('.profile__edit-button');
let editPopup = container.querySelector('.popup_type_edit');
let closeButton = container.querySelector('.popup__close-button');
let popup = container.querySelector('.popup');
// Находим форму в DOM
let formEdit = container.querySelector('.popup__form_type_edit');
// Находим поля формы в DOM
let nameInput = document.getElementById('#inputName');
let jobInput = document.getElementById('#inputOccupation');
// Выберите элементы, куда должны быть вставлены значения полей.
let bio = container.querySelector('.profile__info-text')
let editName = bio.querySelector('.profile__name')
let editJob = bio.querySelector('.profile__occupation')

//Отображение попапа Edit
function showEdit() {
  editPopup.classList.add('popup_status_opened');
}

editButton.addEventListener('click', showEdit);
//Закрытие попапов
function closePopup() {
  popup.classList.remove('popup_status_opened');
}

closeButton.addEventListener('click', closePopup);



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value. При выносе за пределы функции обработчик не считывает данные. Исправить*
  let inputs = [nameInput.value, jobInput.value];
  // Вставьте новые значения с помощью textContent.
  editName.textContent = inputs[0];
  editJob.textContent = inputs[1];
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler);
