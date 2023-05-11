import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const input = document.getElementById("datetime-picker")
const startButton = document.querySelector("[data-start]")
const days = document.querySelector("[data-days]")
const hours = document.querySelector("[data-hours]")
const minutes = document.querySelector("[data-minutes]")
const seconds = document.querySelector("[data-seconds]")
startButton.disabled = true;
let today = 0;
let currentDay = 0;
flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates, dateStr) {
        today = Date.now()
        currentDay = new Date(dateStr)
    if (today > currentDay) {
        Notiflix.Notify.failure("Please choose a date in the future")
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
    }
  },
})
startButton.addEventListener("click", (() => {
  startButton.disabled = true;
  setInterval(() => {
    today = Date.now()
    const time = currentDay - today
    const convert = convertMs(time)
    days.textContent = convert.days
    hours.textContent = convert.hours
    minutes.textContent = convert.minutes
    seconds.textContent = convert.seconds
  },1000)
}))
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