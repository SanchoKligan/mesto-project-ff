import '../pages/index.css';
import {
  addCardApi,
  getInitialCardsApi,
  getUserDataApi,
  updateUserAvatarApi,
  updateUserDataApi,
} from './api';
import { createCard, deleteCard, likeCard } from "./card";
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';

const cardsListElement = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileJobInput = editProfileForm.querySelector('.popup__input_type_description');

const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardForm = addCardModal.querySelector('.popup__form');
const addCardSubmitButton = addCardForm.querySelector('.popup__button');
const addCardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const addCardUrlInput = addCardForm.querySelector('.popup__input_type_url');

const updateAvatarModal = document.querySelector('.popup_type_avatar')
const updateAvatarForm = updateAvatarModal.querySelector('.popup__form');
const updateAvatarSubmitButton = updateAvatarForm.querySelector('.popup__button');
const avatarUrlInput = updateAvatarForm.querySelector('.popup__input_type_avatar-url');

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

let currentUserId;

const openCardModal = (name, link) => {
  cardModalImage.src = link;
  cardModalImage.alt = name;

  cardModalCaption.textContent = name;

  openModal(cardModal);
}

const handleFormSubmit = (e, submitButton, submitAction) => {
  e.preventDefault();

  const originalButtonText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  submitAction().finally(() => {
    setTimeout(() => {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }, 500);
  });
}

const handleEditProfileFormSubmit = () => {
  return updateUserDataApi(profileNameInput.value, profileJobInput.value)
    .then(({ name, about }) => {
      profileTitle.textContent = name;
      profileDescription.textContent = about;

      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении данных профиля: ${ err }`);
    });
}

const handleAddCardFormSubmit = () => {
  return addCardApi(addCardNameInput.value, addCardUrlInput.value)
    .then((cardData) => {
      cardsListElement.prepend(createCard(
        cardData,
        deleteCard,
        likeCard,
        openCardModal,
        currentUserId,
      ));

      closeModal(addCardModal);
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${ err }`);
    });
}

const handleUpdateAvatarFormSubmit = () => {
  return updateUserAvatarApi(avatarUrlInput.value)
    .then(({ avatar }) => {
      profileImage.style.backgroundImage = `url(${ avatar })`;

      closeModal(updateAvatarModal);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${ err }`);
    })
}

editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);

  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', (e) => {
  handleFormSubmit(e, editProfileSubmitButton, handleEditProfileFormSubmit);
});

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);

  openModal(addCardModal);
});

addCardForm.addEventListener('submit', (e) => {
  handleFormSubmit(e, addCardSubmitButton, handleAddCardFormSubmit);
});

profileImage.addEventListener('click', () => {
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, validationConfig);

  openModal(updateAvatarModal);
});

updateAvatarForm.addEventListener('submit', (e) => {
  handleFormSubmit(e, updateAvatarSubmitButton, handleUpdateAvatarFormSubmit);
});

document.querySelectorAll('.popup').forEach((modalElement) => {
  modalElement.addEventListener('click', (e) => {
    const elementClasses = e.target.classList;

    if (elementClasses.contains('popup') || elementClasses.contains('popup__close')) {
      closeModal(modalElement);
    }
  });
});

enableValidation(validationConfig);

Promise.all([getUserDataApi(), getInitialCardsApi()])
  .then(([user, cards]) => {
    const { name, about, avatar, _id } = user;

    currentUserId = _id;

    profileTitle.textContent = name;
    profileDescription.textContent = about;
    profileImage.style.backgroundImage = `url(${ avatar })`;

    cards.forEach((cardData) => {
      cardsListElement.append(createCard(
        cardData,
        deleteCard,
        likeCard,
        openCardModal,
        currentUserId,
      ));
    });
  })
  .catch((err) => {
    console.error(`Ошибка при загрузке данных профиля и/или карточек: ${ err }`);

    profileTitle.textContent = 'Имя';
    profileDescription.textContent = 'Занятие';
  });
