
const reservationName = document.querySelector('.reservation__input_name');
const reservationPhone = document.querySelector('#reservation__phone');

reservationName.addEventListener('input', () => {
  reservationName.value = reservationName.value.replace(/[^А-ЯЁа-яё ]/, '');
});

reservationPhone.addEventListener('input', () => {
  reservationPhone.value = reservationPhone.value.replace(/[^\d+]/, '');
});
