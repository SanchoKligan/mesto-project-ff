const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (cardData, deleteHandler, likeHandler, openHandler) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title= cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const { name, link } = cardData;

  title.textContent = name;
  
  image.src = link;
  image.alt = name;

  deleteButton.addEventListener('click', () => deleteHandler(cardElement));
  likeButton.addEventListener('click', () => likeHandler(likeButton));
  image.addEventListener('click', () => openHandler(name, link));

  return cardElement;
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
}

export const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}
