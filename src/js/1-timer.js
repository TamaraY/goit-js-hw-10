import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let timerInterval = null;

const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate <= currentDate) {
      alert('Please choose a date in the future');
      iziToast.show({
        message: '❌ Please choose a date in the future',
        messageColor: 'white',
        messageSize: '16',
        backgroundColor: 'red',
        position: 'topRight',
      });
      disableButton();
    } else {
      enableButton();
    }
  },
};

flatpickr('#datetime-picker', options);

function disableButton() {
  btnStart.disabled = true;
}

function enableButton() {
  btnStart.disabled = false;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(days, hours, minutes, seconds) {
  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}

function startTimer() {
  disableButton();
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const timerTime = userSelectedDate.getTime() - now;

    if (timerTime <= 0) {
      clearInterval(timerInterval);
      datetimePicker.disabled = false;
      iziToast.show({
        message: '✅ Time is over',
        messageColor: 'white',
        messageSize: '16',
        backgroundColor: 'green',
        position: 'topRight',
      });
      addZero(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timerTime);
    addZero(days, hours, minutes, seconds);
  }, 1000);
}

btnStart.addEventListener('click', startTimer);
