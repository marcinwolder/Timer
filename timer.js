class Timer {
  constructor(timeElement, playBtn, pauseBtn, callbacks) {
    this.timeElement = timeElement;
    this.playBtn = playBtn;
    this.pauseBtn = pauseBtn;
    this.updateTime = 20;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onPause = callbacks.onPause;
    }

    timeElement.addEventListener('input', this.updateTimer);
    playBtn.addEventListener('click', this.play);
    pauseBtn.addEventListener('click', this.pause);
  }
  play = () => {
    if (this.currentTime <= 0) return;
    if (this.onStart) this.onStart(this.currentTime);
    this.tick();
    this.interval = setInterval(() => {
      this.tick();
    }, this.updateTime);
  };
  tick = () => {
    this.currentTime -= this.updateTime / 1000;
    if (this.onTick) this.onTick(this.currentTime);
    if (this.currentTime == 0) this.pause();

    const fractionLeft = Number(this.currentTime).toFixed(2);
    const units = parseInt(this.currentTime);
    const secondsLeft = String(parseInt((fractionLeft - units) * 60));
    timeElement.value =
      secondsLeft.length === 1
        ? `${units}:0${secondsLeft}`
        : `${units}:${secondsLeft}`;
  };
  pause = () => {
    if (this.onPause) this.onPause();
    clearInterval(this.interval);
  };
  updateTimer = () => {
    if (this.timeElement.value)
      this.currentTime = parseInt(this.timeElement.value);
  };
  get currentTime() {
    return parseFloat(timeElement.getAttribute('data-value'));
  }
  set currentTime(time) {
    timeElement.setAttribute('data-value', `${Number(time).toFixed(2)}`);
  }
}
