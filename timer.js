class Timer {
  constructor(timeElement, playBtn, pauseBtn, callbacks) {
    this.timeElement = timeElement;
    this.playBtn = playBtn;
    this.pauseBtn = pauseBtn;
    this.updateTime = 20;
    this.finished = false;

    this.timeOnPause = this.currentTime;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onPause = callbacks.onPause;
      this.onChange = callbacks.onChange;
      this.onFinish = callbacks.onFinish;
    }

    timeElement.addEventListener('input', this.updateTimer);
    playBtn.addEventListener('click', this.play);
    pauseBtn.addEventListener('click', this.pause);
  }
  play = () => {
    if (this.currentTime > 0) playBtn.removeEventListener('click', this.play);
    if (this.currentTime <= 0) return;
    if (this.onStart) this.onStart(this.currentTime, this.changed);

    this.changed = false;
    this.tick();
    this.interval = setInterval(() => {
      this.tick();
    }, this.updateTime);
  };
  tick = () => {
    this.currentTime -= this.updateTime / 1000;
    if (this.onTick) this.onTick(this.currentTime);
    if (this.currentTime <= 0) {
      this.pause();
      this.finish();
    }

    const fractionLeft = Number(this.currentTime).toFixed(2); // Przebudowa - tutaj jest pokazywanie na tarczy
    const units = parseInt(this.currentTime);
    const secondsLeft = String(parseInt((fractionLeft - units) * 60));
    timeElement.value =
      secondsLeft.length === 1
        ? `${units}:0${secondsLeft}`
        : `${units}:${secondsLeft}`;
  };
  pause = () => {
    this.timeOnPause = this.currentTime;
    if (this.onPause) this.onPause(this.timeOnPause);

    clearInterval(this.interval);
    playBtn.addEventListener('click', this.play);
  };
  finish = () => {
    if (this.onFinish) this.onFinish();
  };
  updateTimer = () => {
    if (this.onChange) this.onChange();

    const input = this.timeElement.value;
    function restCalc(input, colonIndex) {
      return colonIndex === input.length - 1
        ? 0
        : parseInt(
            colonIndex === input.length - 2
              ? input.slice(colonIndex + 1, input.length) * 10
              : input.slice(colonIndex + 1, input.length)
          );
    }
    if (input) {
      const colonIndex = input.indexOf(':');
      let sec, rest;
      if (colonIndex !== -1) {
        if (colonIndex === 0) {
          sec = 0;
          rest = restCalc(input, colonIndex);
        } else {
          sec = parseInt(input.slice(0, colonIndex));
          rest = restCalc(input, colonIndex);
        }
      } else {
        sec = parseInt(input);
        rest = 0;
      }
      this.currentTime = sec + rest / 60;
    }
    if (
      // Przebudowanie musi być = sprawdzenie z tarczy nie z wartości - tutaj jest system sprawdzania czy wpisana jest taka sama jak poprzednia
      this.timeOnPause === this.currentTime ||
      this.timeOnPause === this.currentTime + 0.01
    )
      this.changed = false;
    else this.changed = true;
  };
  get currentTime() {
    return parseFloat(timeElement.getAttribute('data-value'));
  }
  set currentTime(time) {
    timeElement.setAttribute('data-value', `${Number(time).toFixed(2)}`);
  }
}
