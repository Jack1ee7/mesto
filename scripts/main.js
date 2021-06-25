let container = document.querySelector('.page');
let editButton = container.querySelector('.profile__edit-button');
let editPopup = container.querySelector('.popup_type_edit');
let closeButton = container.querySelector('.popup__close-button');
let popup = container.querySelector('.popup');

editButton.addEventListener('click', function showEdit() {
  editPopup.classList.add('popup_status_opened');
});

closeButton.addEventListener('click', function closePopup() {
  popup.classList.remove('popup_status_opened');
});
