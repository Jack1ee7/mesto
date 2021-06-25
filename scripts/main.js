let container = document.querySelector('.page');
let editButton = container.querySelector('.profile__edit-button');
let editPopup = container.querySelector('.popup_type_edit');
let closeButton = container.querySelector('.popup__close-button');
let popup = container.querySelector('.popup');
// Находим форму в DOM
let formElement = container.querySelector('.popup__form_type_edit');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__form-input-name');
let jobInput = formElement.querySelector('.popup__form-input-occupation');

editButton.addEventListener('click', function showEdit() {         //Отображение попапа Edit
  editPopup.classList.add('popup_status_opened');
});

closeButton.addEventListener('click', function closePopup() {              //Закрытие попапов
  popup.classList.remove('popup_status_opened');
});



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let inputs = [nameInput.value, jobInput.value];
  // Выберите элементы, куда должны быть вставлены значения полей
  let editName = container.querySelector('.profile__name')
  let editJob = container.querySelector('.profile__occupation')
  // Вставьте новые значения с помощью textContent
  editName.textContent = inputs[0];
  editJob.textContent = inputs[1];
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
