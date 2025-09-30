import '../pages/index.css';
import { initialCards, createCard, deleteCard, likeCard } from "./cards";

const cardTemplate = document.querySelector('#card-template').content;
const cardsListElement = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
  cardsListElement.append(createCard(cardTemplate, cardData));
});

cardsListElement.addEventListener('click', (e) => {
  const clickedElement = e.target;

  if (clickedElement.classList.contains('card__delete-button')) {
    deleteCard(clickedElement);
  } else if (clickedElement.classList.contains('card__like-button')) {
    likeCard(clickedElement);
  }
});
