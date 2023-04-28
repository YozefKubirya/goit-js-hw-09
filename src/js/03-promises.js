import Notiflix from "notiflix"; 
import debounce from "lodash.debounce";
const refs = {
   form: document.querySelector('.form'),
   button: document.querySelector('button')
};
refs.form.addEventListener('input', debounce(onInputForm, 1500));
refs.button.addEventListener('click', onButtonClick);
const formInputsStorage = {};
function onInputForm(e) {
   if (e.target.name==='delay') {
   formInputsStorage.delay=Number(e.target.value)
}
   if (e.target.name==='step') {
    formInputsStorage.step=Number(e.target.value)  
   }  
   if (e.target.name==='amount') {
      formInputsStorage.amount=Number(e.target.value)
   }
   // console.log(formInputsStorage)
   }
   
function onButtonClick(e) {
   e.preventDefault();
   let delay = formInputsStorage.delay;
   // console.log(delay);
   let position=0;
   for (let i = 0; i < formInputsStorage.amount; i += 1) {
      delay += formInputsStorage.step;
      position += 1;
      // console.log(delay);
       createPromise(position, delay).then(({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
   Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
   }
}



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
       const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
         if (shouldResolve) {
            resolve({ position, delay });
         } else {
            reject({ position, delay });
         }
      }, delay);
   });


   
};  