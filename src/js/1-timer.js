import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const startTimerBtn = document.querySelector('button[data-start]')
const dateTimerPicker = document.querySelector('#datetime-picker')
const daysCounter = document.querySelector('.value[data-days]')
const hoursCounter = document.querySelector('.value[data-hours]')
const minutesCounter = document.querySelector('.value[data-minutes]')
const secondsCounter = document.querySelector('.value[data-seconds]')

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const dateDifference = selectedDates[0] - Date.now();

      if (dateDifference > 0) {
      startTimerBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      startTimerBtn.disabled = true;
      iziToast.show(errorToastOpt);
      }
  },
};
flatpickr('#datetime-picker', options);


startTimerBtn.addEventListener('click', timerInit) 

function timerInit(event) {
    event.target.disabled = true;
    dateTimerPicker.disabled = true;

    iziToast.success(successToastOpt);

    const intervalId = setInterval(() => {
        const dateDifference = userSelectedDate - Date.now();
        if (dateDifference <= 0) {
            clearInterval(intervalId);
            dateTimerPicker.disabled = false;
            iziToast.info(infoToastOpt);

            return;
        }
        const timerValues = convertMs(dateDifference);

        secondsCounter.textContent = addLeadingZero(timerValues.seconds);
        minutesCounter.textContent = addLeadingZero(timerValues.minutes);
        hoursCounter.textContent = addLeadingZero(timerValues.hours);
        daysCounter.textContent = addLeadingZero(timerValues.days);
    }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
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

const errorToastOpt = {
  title: 'Error',
  titleSize: '16px',
  titleLineHeight: 1.5,
  message: 'Please choose a date in the future',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: 1.5,
  backgroundColor: '#EF4040',
  iconColor: '#fff',
  position: 'topRight',
  theme: 'dark',
  closeOnEscape: true,
  transitionIn: 'bounceInDown',
  transitionOut: 'fadeOutUp',
};

const successToastOpt = {
  title: 'OK',
  titleSize: '16px',
  titleLineHeight: 1.5,
  message: 'The timer has started successfully!',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: 1.5,
  backgroundColor: '#59a10d',
  position: 'topRight',
  theme: 'dark',
  closeOnEscape: true,
  transitionIn: 'bounceInDown',
  transitionOut: 'fadeOutUp',
};

const infoToastOpt = {
  title: 'Notification',
  titleSize: '16px',
  titleLineHeight: 1.5,
  message: 'The timer just expired',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: 1.5,
  backgroundColor: '#0099FF',
  position: 'topRight',
  theme: 'dark',
  closeOnEscape: true,
  transitionIn: 'bounceInDown',
  transitionOut: 'fadeOutUp',
};
