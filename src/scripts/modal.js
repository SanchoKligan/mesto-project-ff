const escapeHandle = (e) => {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');

    closeModal(openedModal);
  }
}

export const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');

  document.addEventListener('keydown', escapeHandle);
}

export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', escapeHandle);
}
