const createCard = (cardData, deleteCardHandler) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardHandler);

  return cardElement;
};

const deleteCard = (e) => {
  e.target.parentElement.remove();
}

const cardsListElement = document.querySelector('.places__list');

initialCards.forEach((card) => {
  cardsListElement.append(createCard(card, deleteCard));
});
