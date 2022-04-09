
const footerForm = document.querySelector('.footer__form');

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
