import Notiflix from "notiflix"; 
import debounce from "lodash.debounce";
const refs = {
   form: document.querySelector('.form'),
   button: document.querySelector('button')
};

refs.form.addEventListener('submit', onInputForm);

function onInputForm(e) {
   e.preventDefault();
   const { delay, step, amount } = e.target.elements;
   let delayValue = Number(delay.value);
  
  
   
   
   for (let i = 1; i <= amount.value; i += 1){
   
      createPromise(i, delayValue).then(() => { Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delayValue += Number(step.value)}ms`) }).catch(() => {
         Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delayValue += Number(step.value)} ms`);
      });
      ;

   }
  
   }
   

function createPromise(position,delay) {
  return new Promise((resolve, reject) => {
       const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
         if (shouldResolve) {
            resolve({ position,delay });
         } else {
            reject({ position,delay });
         }
      },);
   });  
};  
// function onButtonClick(e) {
// //    e.preventDefault();
// //    let delay = formInputsStorage.delay;
// //    // console.log(delay);
// //    let position=0;
// //    for (let i = 0; i < formInputsStorage.amount; i += 1) {
// //       delay += formInputsStorage.step;
// //       position += 1;
// //       // console.log(delay);
// //        createPromise(position, delay).then(({ position, delay }) => {
// //   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
// //   })
// //   .catch(({ position, delay }) => {
// //    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// //   });
// //    }
// }