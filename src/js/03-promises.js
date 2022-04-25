import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  const elment = e.currentTarget.elements;
  const amount = Number(elment.amount.value);
  let firstdelay = Number(elment.delay.value);
  const step = Number(elment.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstdelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstdelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resove, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resove({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
