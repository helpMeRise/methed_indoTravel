
export const burger = () => {
  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');

  headerMenuButton.addEventListener('click', () => {
    headerMenu.classList.toggle('header__menu_active');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header__menu') && e.target !== headerMenuButton ||
      e.target.closest('.header__link')) {
      headerMenu.classList.remove('header__menu_active');
    }
  });
};
