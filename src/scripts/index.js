import '../pages/index.css';
import { initialCards, createCard, deleteCard, likeCard } from "./cards";
import { openModal, closeModal } from './modal';

const cardsListElement = document.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const cardModal = document.querySelector('.popup_type_image');
const cardModalImage = cardModal.querySelector('.popup__image');
const cardModalCaption = cardModal.querySelector('.popup__caption');

const openCardModal = (e) => {
  e.stopPropagation();

  const image = e.target;
  const title = image.parentElement.querySelector('.card__title');

  cardModalImage.src = image.src;
  cardModalImage.alt = image.alt;

  cardModalCaption.textContent = title.textContent;

  openModal(cardModal);
}

initialCards.forEach((cardData) => {
  cardsListElement.append(createCard(cardData, deleteCard, likeCard, openCardModal));
});

[editModal, addCardModal, cardModal].forEach((modalElement) => {
  modalElement.addEventListener('click', (e) => {
    e.stopPropagation();

    const elementClasses = e.target.classList;

    if (elementClasses.contains('popup') || elementClasses.contains('popup__close')) {
      closeModal(modalElement);
    }
  });
});
