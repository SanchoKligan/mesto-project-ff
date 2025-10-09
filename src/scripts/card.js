import { deleteCardApi } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (cardData, deleteHandler, likeHandler, openHandler, userId) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title= cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const { name, link, likes, _id, owner } = cardData;

  title.textContent = name;
  image.src = link;
  image.alt = name;
  likeCounter.textContent = likes.length;

  likeButton.addEventListener('click', () => likeHandler(likeButton));
  image.addEventListener('click', () => openHandler(name, link));

  if (owner._id === userId) {
    deleteButton.addEventListener('click', () => deleteHandler(cardElement, _id));
  } else {
    deleteButton.style.display = 'none';
  }

  return cardElement;
};

export const deleteCard = (cardElement, cardId) => {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${ err }`);
    });
}

export const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}
