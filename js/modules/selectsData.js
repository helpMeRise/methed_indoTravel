
const dateSelects = document.querySelectorAll('select[name="dates"]');
const peopleSelects = document.querySelectorAll('select[name="people"]');
const reservationData = document.querySelector('.reservation__data');
const reservationPrice = document.querySelector('.reservation__price');
let price = 0;

const loadData = async () => {
  const result = await fetch('info.json');
  const data = await result.json();
  return data;
};

const createDateOptions = async (select) => {
  const data = await loadData();
  const options = data.map(item => {
    const option = document.createElement('option');
    option.value = item.date;
    option.textContent = option.value;
    price = item.price;
    return option;
  });
  select.append(...options);
  reservationData.textContent = `${dateSelects[1].value},
    ${peopleSelects[1].value}`;
  reservationPrice.textContent = `$${+peopleSelects[1].value * price}`;
};

const createPeopleOptions = async (select, number) => {
  select.innerHTML = '';
  const data = await loadData();
  data.forEach(item => {
    if (dateSelects[number].value === item.date) {
      for (let i = item['min-people']; i <= item['max-people']; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = option.value;
        peopleSelects[number].append(option);
        price = item.price;
      }
    }
  });
  reservationData.textContent = `${dateSelects[1].value},
    ${peopleSelects[1].value}`;
  reservationPrice.textContent = `$${+peopleSelects[1].value * price}`;
};

dateSelects.forEach(item => {
  createDateOptions(item);
});

peopleSelects.forEach((item, index) => {
  createPeopleOptions(item, index);
});

dateSelects.forEach((item, index) => {
  item.addEventListener('input', () => {
    const number = index === 0 ? 0 : 1;
    createPeopleOptions(peopleSelects[number], number);
    reservationData.textContent = `${dateSelects[1].value},
      ${peopleSelects[1].value}`;
    reservationPrice.textContent = `$${+peopleSelects[1].value * price}`;
  });
});

peopleSelects[1].addEventListener('input', () => {
  reservationData.textContent = `${dateSelects[1].value},
    ${peopleSelects[1].value}`;
  reservationPrice.textContent = `$${+peopleSelects[1].value * price}`;
});
