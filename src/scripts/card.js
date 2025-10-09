import { deleteCardApi, likeCardApi, dislikeCardApi } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (
  cardData,
  deleteHandler,
  likeHandler,
  openHandler,
  userId
) => {
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

  if (likes.some((userData) => userData._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  image.addEventListener('click', () => openHandler(name, link));
  likeButton.addEventListener(
    'click',
    () => likeHandler(likeButton, _id, likeCounter),
  );

  if (owner._id === userId) {
    deleteButton.addEventListener(
      'click',
      () => deleteHandler(cardElement, _id),
    );
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

export const likeCard = (likeButton, cardId, likeCounter) => {
  const likeButtonClasses = likeButton.classList;
  const likeAction = likeButtonClasses.contains('card__like-button_is-active')
    ? dislikeCardApi
    : likeCardApi;

  likeAction(cardId)
    .then(({ likes }) => {
      likeButtonClasses.toggle('card__like-button_is-active');
      likeCounter.textContent = likes.length;
    })
    .catch((err) => {
      console.error(`Ошибка при постановке/снятии лайка карточки: ${ err }`);
    });
}
