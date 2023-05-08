const startButton = document.querySelector("[data-start]")
const stopButton = document.querySelector("[data-stop]")
let checkFunction = false;
startButton.addEventListener("click", changeColor)
stopButton.addEventListener("click", stopChangeColor)
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
function changeColor() {
    startButton.disabled = true;
    stopButton.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor()
        document.body.style.backgroundColor = color
    },1000)
}
function stopChangeColor() {
    clearInterval(timerId)
    startButton.disabled = false;
    stopButton.disabled = true;
}