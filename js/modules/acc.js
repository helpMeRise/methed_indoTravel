
export const accordion = () => {
  const travelItem = document.querySelectorAll('.travel__item');
  const travelItemTitle = document.querySelectorAll('.travel__item-title');
  const travelItemTextWrapper =
    document.querySelectorAll('.travel__item-text-wrapper');

  let wrapperHeight = 0;
  travelItemTextWrapper.forEach((elem) => {
    if (elem.scrollHeight > wrapperHeight) {
      wrapperHeight = elem.scrollHeight;
    }
  });

  travelItemTitle.forEach((elem, index) => {
    elem.addEventListener('click', ({target}) => {
      travelItem.forEach((item, i) => {
        if (index === i) {
          travelItemTextWrapper[i].style.height =
            item.classList.contains('travel__item_active') ?
              '' : `${wrapperHeight}px`;
          item.classList.toggle('travel__item_active');
        } else {
          travelItemTextWrapper[i].style.height = '';
          item.classList.remove('travel__item_active');
        }
      });
    });
  });
};
