import '../pages/index.css';
import { createCard, deleteCard, likeCard } from "./card";
import { initialCards } from './cards';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';

const cardsListElement = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardUrlInput = document.querySelector('.popup__input_type_url');

const cardModal = document.querySelector('.popup_type_image');
const cardModalImage = cardModal.querySelector('.popup__image');
const cardModalCaption = cardModal.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const openCardModal = (name, link) => {
  cardModalImage.src = link;
  cardModalImage.alt = name;

  cardModalCaption.textContent = name;

  openModal(cardModal);
}

const handleEditProfileFormSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  closeModal(editProfileModal)
}

const handleAddCardFormSubmit = (e) => {
  e.preventDefault();

  const cardData = {
    name: addCardNameInput.value,
    link: addCardUrlInput.value,
  };

  cardsListElement.prepend(createCard(cardData, deleteCard, likeCard, openCardModal));

  closeModal(addCardModal);
}

initialCards.forEach((cardData) => {
  cardsListElement.append(createCard(cardData, deleteCard, likeCard, openCardModal));
});

editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);

  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);

  openModal(addCardModal);
});

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

document.querySelectorAll('.popup').forEach((modalElement) => {
  modalElement.addEventListener('click', (e) => {
    const elementClasses = e.target.classList;

    if (elementClasses.contains('popup') || elementClasses.contains('popup__close')) {
      closeModal(modalElement);
    }
  });
});

enableValidation(validationConfig);
