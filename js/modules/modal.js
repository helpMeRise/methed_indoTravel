import loadStyle from './loadStyle.js';
import fetchRequest from './sendForms.js';

const reservationForm = document.querySelector('.reservation__form');
const reservationPrice = document.querySelector('.reservation__price');

const modal = async (err, data) => {
  await loadStyle('css/modal.css');
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalPeople = document.createElement('p');
  const modalDates = document.createElement('p');
  const modalPrice = document.createElement('p');
  const modalBtns = document.createElement('div');
  const modalConfirm = document.createElement('button');
  const modalEdit = document.createElement('button');

  overlay.classList.add('overlay', 'overlay_confirm');
  modal.className = 'modal';
  modalTitle.className = 'modal__title';
  modalTitle.textContent = `Подтверждение заявки`;
  modalPeople.className = 'modal__text';
  modalPeople.textContent = `Бронирование путешествия в Индию
    на ${data.people} человек`;
  modalDates.textContent = `В даты: ${data.dates}`;
  modalDates.className = 'modal__text';
  modalPrice.textContent = `Cтоимость тура ${reservationPrice.textContent}`;
  modalPrice.className = 'modal__text';
  modalBtns.className = 'modal__button';
  modalConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  modalConfirm.textContent = 'Подтверждаю';
  modalEdit.classList.add('modal__btn', 'modal__btn_edit');
  modalEdit.textContent = 'Изменить данные';

  modalBtns.append(modalConfirm, modalEdit);
  modal.append(modalTitle, modalPeople, modalDates, modalPrice, modalBtns);
  overlay.append(modal);
  document.body.append(overlay);

  return new Promise((resolve) => {
    modalEdit.addEventListener('click', () => {
      overlay.remove();
      resolve();
    });

    modalConfirm.addEventListener('click', () => {
      fetchRequest('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: {
          name: reservationForm.reservation__name.value,
          phone: reservationForm.reservation__phone.value,
          dates: reservationForm.dates.value,
          people: reservationForm.people.value,
        },
        callback(err, data) {
          if (err) {
            console.warn(err, data);
          } else {
            overlay.remove();
            reservationForm.reset();
            reservationForm.querySelectorAll('input').forEach(item => {
              item.setAttribute('disabled', 'disabled');
            });
            reservationForm.querySelectorAll('select').forEach(item => {
              item.setAttribute('disabled', 'disabled');
            });
          }
        },
      });
    });
  });
};

reservationForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(reservationForm);
  const reservation = Object.fromEntries(formData);

  modal(null, reservation);
});


