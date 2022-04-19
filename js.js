const timeElement = document.querySelector('#time');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const circle = document.querySelector('circle');

const timerBox = timeElement.parentElement.parentElement;
const timerBoxBound = timerBox.getBoundingClientRect();

const radius = (9 * timerBoxBound.width) / 20;
const circumference = 2 * Math.PI * radius;

circle.setAttribute('cx', `${timerBoxBound.width / 2}px`);
circle.setAttribute('cy', `${timerBoxBound.height / 2}px`);
circle.setAttribute('stroke-width', `${timerBoxBound.width / 20}px`);
circle.setAttribute('r', `${radius}px`);

console.log(timerBoxBound);

time.value = '3:00';
let startingTime;

const timer = new Timer(timeElement, playBtn, pauseBtn, {
  onStart(duration) {
    circle.style.visibility = 'visible';
    circle.setAttribute('stroke-dasharray', `${circumference}px`);
    startingTime = duration;
  },
  onTick(currentTime) {
    const x = circumference * (currentTime / startingTime);
    circle.setAttribute('stroke-dashoffset', `${x}px`);
  },
});
