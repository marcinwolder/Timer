const timeElement = document.querySelector('#time');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const circle = document.querySelector('circle');

const radius = circle.getAttribute('r');
const circumference = 2 * Math.PI * radius;

time.value = '3:00';
let startingTime;

const timer = new Timer(timeElement, playBtn, pauseBtn, {
  onStart(duration) {
    circle.setAttribute('stroke-dasharray', `${circumference}px`);
    startingTime = duration;
  },
  onTick(currentTime) {
    const x = circumference * (1 - currentTime / startingTime);
    circle.setAttribute('stroke-dashoffset', `-${x}px`);
  },
});
