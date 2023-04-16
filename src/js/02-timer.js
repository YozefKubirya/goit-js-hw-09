// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const refs = {
   input: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('button[data-start]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]'),
};


const DELAY = 1000;
let startTime = null;
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => {
   timer.start(startTime);
})
class Timer{
   constructor({onTick}) {
      this.intervalId = null;
      this.isActive = false;
      this.onTick = onTick;
   }
   start(startTime) {
      if (this.isActive) {
         return;
      }
      this.startTime = startTime;
      this.isActive = true;
     this.intervalId= setInterval(()=>{
         const currentTime = Date.now();
         
         const deltaTime = startTime-currentTime;
         
        const time = convertMs(deltaTime);
        this.onTick(time);
        if (deltaTime <= 0) {
         this.stop()
      }
      }, 1000)
   }
   stop() {
      clearInterval(this.intervalId);
      this.isActive = false;
      const time = convertMs(0)
      this.onTick(time)
   }
}
const timer = new Timer({onTick:updateClockface})


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
   onClose(selectedDates) {
      // console.log(selectedDates[0]);
      startTime = selectedDates[0];
      // console.log(startTime)
      if (selectedDates[0] < Date.now()) {
          window.alert('please choose date in future');
      };
      refs.startBtn.disabled = false;
   }
};
function updateClockface({ days, hours, minutes, seconds }) {
   refs.days.textContent = ` ${ days }`;
   refs.hours.textContent = `${ hours }`;
   refs.minutes.textContent = `${minutes }`;
   refs.seconds.textContent = `${ seconds }`;
}
function pad(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}






flatpickr(refs.input, options);
// const timer = {
//    isActive: false, 
//    timerId:null,
//    start() {
//       if (this.isActive) {
//          return;
//       };
//       this.isActive = true;
    
//    this.timerId =  setInterval(() => {
//          const currentTime = Date.now();
//       const deltaTime = startTime - currentTime;
//          const timerEditor = convertMs(deltaTime);
//       const time = updateClockface(timerEditor);
//       if (deltaTime <= 0) {
//          this.stop();
//       }
//       },DELAY)
//    },
//    stop() {
//       clearInterval(this.timerId);
//       this.isActive = false;
//       timerEditor = convertMs(0);
//       time = updateClockface(timerEditor);
//    }
// }
// 