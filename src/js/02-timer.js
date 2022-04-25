import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.disabled = true;

const timer = {
  start(chooseTime) {
    let timerId = setInterval(() => {
      const currentTime = Date.now();
      const differentTime = chooseTime - currentTime;
      if (differentTime < 1000) {
        clearInterval(timerId);
      }
      convertMs(differentTime);
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectTime = selectedDates[0].getTime();

    if (selectTime < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.start.disabled = false;
      refs.start.addEventListener('click', () => {
        timer.start(selectTime);
        refs.start.disabled = true;
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  updateTimerTextContent(days, hours, minutes, seconds);
}

function updateTimerTextContent(days, hours, minutes, seconds) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
