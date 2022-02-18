
export const burger = () => {
  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');
  const duration = 300;
  let startTime = NaN;
  let requestId = NaN;

  const showMenu = () => {
    requestId = requestAnimationFrame(function opacity(timestamp) {
      startTime ||= timestamp;
      const progress = (timestamp - startTime) / duration;
      headerMenu.style.opacity = progress;
      if (progress < 1) {
        requestId = requestAnimationFrame(opacity);
      } else {
        cancelAnimationFrame(requestId);
        startTime = NaN;
      }
    });
  };

  headerMenuButton.addEventListener('click', () => {
    if (headerMenu.style.zIndex === '1') {
      headerMenu.style.opacity = 0;
      headerMenu.style.zIndex = -1;
    } else {
      headerMenu.style.zIndex = 1;
      requestAnimationFrame(showMenu);
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header__menu') && e.target !== headerMenuButton ||
      e.target.closest('.header__link')) {
      headerMenu.style.opacity = 0;
      headerMenu.style.zIndex = -1;
    }
  });
};
