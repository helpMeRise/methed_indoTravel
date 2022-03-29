
const footerForm = document.querySelector('.footer__form');

// const modalShow = (status) => {
//   const modalWrap = document.createElement('div');
//   modalWrap.style = `
//     position: fixed;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100vw;
//     height: 100vh;
//     top: 0;
//     left: 0;
//     background-color: rgba(000, 000, 000, 0.5);
//   `;

//   const modal = document.createElement('div');
//   modal.style = `
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-around;
//     width: 800px;
//     height: 300px;
//     background-color: #fff;
//   `;
//   modalWrap.append(modal);

//   const modalTitle = document.createElement('h2');
//   const modalText = document.createElement('p');
//   const modalButton = document.createElement('button');
//   if (status === 'ok') {
//     modalTitle.textContent = 'Ваша заявка успешно отправлена';
//     modalText.textContent = `Наши менеджеры свяжутся с вами в течение
//       3-х рабочих дней`;
//     modalButton.style = `
//       outline: none;
//       border: none;
//       width: 100px;
//       height: 100px;
//       background: url("../img/reservation/ok.svg") center/contain no-repeat;
//     `;
//   } else {
//     modalTitle.textContent = 'Упс... Что-то пошло не так';
//     modalText.textContent = `Не удалось отправить заявку.
//       Пожалуйста, повторите отправку еще раз`;
//     modalButton.classList.add('reservation__button', 'button');
//     modalButton.textContent = 'Забронировать';
//   }

//   modal.append(modalTitle, modalText, modalButton);

//   document.body.append(modalWrap);

//   modalButton.addEventListener('click', () => {
//     modalWrap.remove();
//   });
// };

const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

// reservationForm.addEventListener('submit', e => {
//   e.preventDefault();

//   fetchRequest('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: {
//       name: reservationForm.reservation__name.value,
//       phone: reservationForm.reservation__phone.value,
//       dates: reservationForm.dates.value,
//       people: reservationForm.people.value,
//     },
//     callback(err, data) {
//       if (err) {
//         console.warn(err, data);
//       }
//     },
//   });
// });

const footerFormTitle = document.querySelector('.footer__form-title');
const footerFormText = footerForm.querySelector('.footer__text');
const footerFormInput = footerForm.querySelector('.footer__input-wrap');

footerForm.addEventListener('submit', e => {
  e.preventDefault();

  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      email: footerForm.footer__email.value,
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        footerFormTitle.textContent = 'Упс... Что-то пошло не так';
        footerFormText.textContent = `Не удалось отправить заявку.
        Пожалуйста, повторите отправку еще раз`;
        footerForm.reset();
      } else {
        footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
        footerFormText.textContent = `Наши менеджеры свяжутся с вами в течение
        3-х рабочих дней`;
        footerFormInput.remove();
      }
    },
  });
});

export default fetchRequest;
