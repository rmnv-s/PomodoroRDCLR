const pomodoro = document.querySelector('.pomodoro');
const tabs = document.querySelectorAll('.tab');
const tabsContent = document.querySelectorAll('.tab__content');

// const timerElement = document.querySelector('.tab__time');
const buttonStart = document.querySelector('.button__start');
const buttonPause = document.querySelector('.button__pause');
const buttonReset = document.querySelector('.button__reset');

let timer;
let isPaused = false;
// let timeLeft = 25 * 60;

function startTimer() {
  buttonStart.disabled = true;
  buttonReset.disabled = false;
  buttonPause.disabled = false;

  timer = setInterval(function () {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    const activeTabContent = document.querySelector('.tab__content--active');
    const timerElement = activeTabContent.querySelector('.tab__time');
    timerElement.textContent = formatTime(min) + ':' + formatTime(sec);

    if (timeLeft === 0) {
      clearInterval(timer);
      buttonStart.disabled = false;
      buttonReset.disabled = true;
    }
    timeLeft--;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  const activeTabContent = document.querySelector('.tab__content--active');
  const timerElement = activeTabContent.querySelector('.tab__time');
  const defaultTime = activeTabContent.dataset.defaultTime;
  timerElement.textContent = defaultTime;

  buttonStart.disabled = false;
  buttonReset.disabled = true;
  buttonPause.disabled = false;
  isPaused = false;
}

function pauseTimer() {
  clearInterval(timer);
  buttonStart.disabled = false;
  buttonPause.disabled = true;
  isPaused = true;
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

pomodoro.addEventListener('click', function (e) {
  const clicked = e.target.closest('.tab');

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove('tab__active'));
  tabsContent.forEach((c) => c.classList.remove('tab__content--active'));

  clicked.classList.add('tab__active');

  const selectedTabContent = document.querySelector(`.tab__content--${clicked.dataset.tab}`);
  selectedTabContent.classList.add('tab__content--active');

  resetTimer();
});

function handleStartButtonClick() {
  const activeTab = document.querySelector('.tab__content--active');

  if (isPaused) {
    startTimer();
    return;
  }

  console.log(activeTab);

  if (activeTab.classList.contains('tab__content--1')) {
    timeLeft = 25 * 60;
    // startTimer();
  } else if (activeTab.classList.contains('tab__content--2')) {
    timeLeft = 5 * 60;
  } else if (activeTab.classList.contains('tab__content--3')) {
    timeLeft = 15 * 60;
  }
  startTimer();
}

buttonStart.addEventListener('click', handleStartButtonClick);

buttonPause.addEventListener('click', pauseTimer);
buttonReset.addEventListener('click', resetTimer);
