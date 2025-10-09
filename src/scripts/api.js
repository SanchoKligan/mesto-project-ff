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

export const getUserData = () => {
  return fetch(`${ config.baseUrl }/users/me`, {
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => Promise.reject(err));
}

export const getInitialCards = () => {
  return fetch(`${ config.baseUrl }/cards`, {
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => Promise.reject(err));
}