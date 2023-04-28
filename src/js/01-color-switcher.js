
const refs = {
   startBtn: document.querySelector('button[data-start]'),
   stopBtn: document.querySelector('button[data-stop]')
};
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick)

const delayValue = 1000;
let intervalId = null;
refs.stopBtn.disabled = true;
function onStartBtnClick() {
   refs.startBtn.disabled = true;
   refs.stopBtn.disabled = false;
  intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
   }, delayValue);
   
};
function onStopBtnClick() {
   refs.startBtn.disabled = false;
   refs.stopBtn.disabled = true;
   clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}