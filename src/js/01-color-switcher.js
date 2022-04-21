function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.start.addEventListener('click', startChangeColor);
refs.stop.addEventListener('click', stopChangeColor);

let interval = false;
let timer = null;

function startChangeColor() {
  if (interval) {
    return;
  } else {
    timer = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    interval = true;
  }
}

function stopChangeColor() {
  interval = false;
  clearInterval(timer);
}
