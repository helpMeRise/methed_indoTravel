
const reservationForm = document.querySelector('.reservation__form');
const footerForm = document.querySelector('.footer__form');

const modalShow = (status) => {
  const modalWrap = document.createElement('div');
  modalWrap.style = `
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(000, 000, 000, 0.5);
  `;

  const modal = document.createElement('div');
  modal.style = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 800px;
    height: 300px;
    background-color: #fff;
  `;
  modalWrap.append(modal);

  const modalTitle = document.createElement('h2');
  const modalText = document.createElement('p');
  const modalButton = document.createElement('button');
  if (status === 'ok') {
    modalTitle.textContent = 'Ваша заявка успешно отправлена';
    modalText.textContent = `Наши менеджеры свяжутся с вами в течение
      3-х рабочих дней`;
    modalButton.style = `
      outline: none;
      border: none;
      width: 100px;
      height: 100px;
      background: url("../img/reservation/ok.svg") center/contain no-repeat;
    `;
  } else {
    modalTitle.textContent = 'Упс... Что-то пошло не так';
    modalText.textContent = `Не удалось отправить заявку.
      Пожалуйста, повторите отправку еще раз`;
    modalButton.classList.add('reservation__button', 'button');
    modalButton.textContent = 'Забронировать';
  }

  modal.append(modalTitle, modalText, modalButton);

  document.body.append(modalWrap);

  modalButton.addEventListener('click', () => {
    modalWrap.remove();
  });
};

const httpRequest = (url, {
  method = 'GET',
  callback,
  body = {},
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        callback(new Error(xhr.status), xhr.response);
        return;
      }
      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data);
    });

    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response);
    });

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
  }
};

reservationForm.addEventListener('submit', e => {
  e.preventDefault();

  httpRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      name: reservationForm.reservation__name.value,
      phone: reservationForm.reservation__phone.value,
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        modalShow();
      } else {
        modalShow('ok');
      }
    },
  });
  reservationForm.reset();
});

const footerFormTitle = document.querySelector('.footer__form-title');
const footerFormText = footerForm.querySelector('.footer__text');
const footerFormInput = footerForm.querySelector('.footer__input-wrap');

footerForm.addEventListener('submit', e => {
  e.preventDefault();

  httpRequest('https://jsonplaceholder.typicode.com/posts', {
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
