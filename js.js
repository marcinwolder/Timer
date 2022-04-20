const timeElement = document.querySelector('#time');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const circle = document.querySelector('circle');

const radius = parseInt(circle.getAttribute('r'));
const circumference = 2 * Math.PI * radius;

time.value = '3:00';
let startingTime = 3;

const timer = new Timer(timeElement, playBtn, pauseBtn, {
  onStart(duration, hasChanged) {
    circle.style.visibility = 'visible';
    circle.setAttribute('stroke-dasharray', `${circumference}px`);
    if (hasChanged) startingTime = duration;
  },
  onPause(time) {
    if (time <= 0) circle.setAttribute('stroke-dashoffset', `${0}px`);
  },
  onTick(currentTime) {
    const x = circumference * (currentTime / startingTime);
    circle.setAttribute('stroke-dashoffset', `${x}px`);
  },
});
