const config = {
  baseUrl: 'https://nomoreparties.co/v1/web-magistracy-2',
  headers: {
    authorization: '3b631baa-0b1a-44b9-a51f-27fc973f415e',
    'Content-Type': 'application/json',
  },
}

const parseResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${ response.status }`);
}

export const getUserDataApi = () => {
  return fetch(`${ config.baseUrl }/users/me`, {
    headers: config.headers,
  })
    .then(parseResponse);
}

export const getInitialCardsApi = () => {
  return fetch(`${ config.baseUrl }/cards`, {
    headers: config.headers,
  })
    .then(parseResponse);
}

export const updateUserDataApi = (name, about) => {
  return fetch(`${ config.baseUrl }/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  })
    .then(parseResponse);
}

export const addCardApi = (name, link) => {
  return fetch(`${ config.baseUrl }/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
    .then(parseResponse);
}

export const deleteCardApi = (cardId) => {
  return fetch(`${ config.baseUrl }/cards/${ cardId }`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(parseResponse);
}

export const likeCardApi = (cardId) => {
  return fetch(`${ config.baseUrl }/cards/likes/${ cardId }`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(parseResponse);
}

export const dislikeCardApi = (cardId) => {
  return fetch(`${ config.baseUrl }/cards/likes/${ cardId }`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(parseResponse);
}

export const updateUserAvatarApi = (avatar) => {
  return fetch(`${ config.baseUrl }/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  })
    .then(parseResponse);
}
