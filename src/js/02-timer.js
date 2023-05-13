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
    if (today >= currentDay) {
        Notiflix.Notify.failure("Please choose a date in the future")
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
    }
  },
})
startButton.addEventListener("click", updateFaceClock)
  function updateFaceClock(){
    startButton.disabled = true;
    input.disabled = true
    const idInterval = setInterval(() => {
    today = Date.now()
    const time = currentDay - today
    const convert = convertMs(time)
    const addZero = addLeadingZero(convert)
    days.textContent = addZero.days
    hours.textContent = addZero.hours
    minutes.textContent = addZero.minutes
    seconds.textContent = addZero.seconds
    if (addZero.days == "00" & addZero.hours == "00" & addZero.minutes == "00" & addZero.seconds == "00") {
      clearInterval(idInterval)
    }
  },1000)
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
function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, "0")
  hours = hours.toString().padStart(2, "0")
  minutes = minutes.toString().padStart(2, "0")
  seconds = seconds.toString().padStart(2, "0")
  return { days, hours, minutes, seconds }
}