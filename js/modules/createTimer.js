
export const timerElements = () => {
  const timerWrap = document.querySelector('[data-timer-deadline]');
  timerWrap.classList.add('timer');
  timerWrap.insertAdjacentHTML("afterbegin", `
    <p class="timer__title">До конца акции осталось:</p>
    <p class="timer__item timer__item_days">
      <span class="timer__count timer__count_days">2</span>
      <span class="timer__units timer__units_days">дня</span></p>
    <p class="timer__item timer__item_hours">
      <span class="timer__count timer__count_hours">05</span>
      <span class="timer__units timer__units_hours">часов</span></p>
    <p class="timer__item timer__item_minutes">
      <span class="timer__count timer__count_minutes">12</span>
      <span class="timer__units timer__units_minutes">минут</span></p>
  `);
}