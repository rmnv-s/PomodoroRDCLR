const pomodoro = document.querySelector('.pomodoro');
const tabs = document.querySelectorAll('.tab');
const tabsContent = document.querySelectorAll('.tab__content');

// TABS
pomodoro.addEventListener('click', function (e) {
  const clicked = e.target.closest('.tab');

  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove('tab__active'));
  tabsContent.forEach((c) => c.classList.remove('tab__content--active'));

  clicked.classList.add('tab__active');

  document
    .querySelector(`.tab__content--${clicked.dataset.tab}`)
    .classList.add('tab__content--active');
});
