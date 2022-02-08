
export const timer = () => {
  const timerDays = document.querySelector('.timer__count_days');
  const timerHours = document.querySelector('.timer__count_hours');
  const timerMinutes = document.querySelector('.timer__count_minutes');
  const timerDaysUnits = document.querySelector('.timer__units_days');
  const timerHoursUnits = document.querySelector('.timer__units_hours');
  const timerMinutesUnits = document.querySelector('.timer__units_minutes');
  const heroText = document.querySelector('.hero__text '); 
  const heroTimer = document.querySelector('.hero__timer');
  const timerBlock = document.querySelector('.timer');
  timerBlock.dataset.deadline = '2022/02/15 19:52';

  const getTimeRemaining = () => {
    const currentTime = Date.now();
    const deadline = new Date(timerBlock.dataset.deadline).getTime();
    const timeRemaining = deadline - currentTime;

    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);

    if (days <= 0 && hours <=0 && minutes <= 0) {
      return 0;
    } else {
      return {days, hours, minutes};
    }
  }

  const getUnits = () => {
    const days = ['день', 'дня', 'дней'];
    const hours = ['час', 'часа', 'часов'];
    const minutes = ['минута', 'минуты', 'минут'];
    const timer = getTimeRemaining();

    let day;
    let hour;
    let minute;

    if (timer.days % 10 === 0 || timer.days > 4 && timer.days < 20 || timer.days % 10 > 4) day = days[2];
    if (timer.days % 10 > 1 && timer.days % 10 < 5) day = days[1];   
    if (timer.days % 10 === 1) day = days[0];

    if (timer.hours % 10 === 0 || timer.hours > 4 && timer.hours < 20 || timer.hours % 10 > 4) hour = hours[2];
    if (timer.hours % 10 > 1 && timer.hours % 10 < 5) hour = hours[1];    
    if (timer.hours % 10 === 1) hour = hours[0];

    if (timer.minutes % 10 === 0 || timer.minutes > 4 && timer.minutes < 20 || timer.minutes % 10 > 4) minute = minutes[2];
    if (timer.minutes % 10 > 1 && timer.minutes % 10 < 5) minute = minutes[1];
    if (timer.minutes % 10 === 1) minute = minutes[0];

    return {day, hour, minute};
  }

  const start = () => {
    const timer = getTimeRemaining();
    const units = getUnits();

    if (!timer) {
      heroText.remove();
      heroTimer.remove();
    }
    timerDays.textContent = timer.days;
    timerHours.textContent = timer.hours;
    timerMinutes.textContent = timer.minutes;
    timerDaysUnits.textContent = units.day;
    timerHoursUnits.textContent = units.hour;
    timerMinutesUnits.textContent = units.minute;

    const intervalId = setTimeout(start, 1000);
  }

  start();
}