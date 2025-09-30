const cardTemplate = document.querySelector('#card-template').content;

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];

export const createCard = (cardData, deleteHandler, likeHandler, openHandler) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title= cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  title.textContent = cardData.name;
  
  image.src = cardData.link;
  image.alt = `Картинка для "${ cardData.name }"`;

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', likeHandler);
  image.addEventListener('click', openHandler);

  return cardElement;
};

export const deleteCard = (e) => {
  e.stopPropagation();

  e.target.parentElement.remove();
}

export const likeCard = (e) => {
  e.stopPropagation();

  e.target.classList.toggle('card__like-button_is-active');
}
