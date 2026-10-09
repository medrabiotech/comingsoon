const countdownBlock = document.querySelector('[data-launch-at]');
const launchTime = Date.parse(countdownBlock.dataset.launchAt);
const timer = countdownBlock.querySelector('[role="timer"]');
const caption = document.getElementById('launch-caption');
const units = Object.fromEntries([...timer.querySelectorAll('[data-time]')].map(element => [element.dataset.time, element]));
let intervalId;

document.getElementById('year').textContent = String(new Date().getFullYear());

function renderCountdown() {
  if (!Number.isFinite(launchTime)) {
    timer.hidden = true;
    caption.textContent = 'Our new website is on its way.';
    clearInterval(intervalId);
    return;
  }
  const totalSeconds = Math.max(0, Math.ceil((launchTime - Date.now()) / 1000));
  const remaining = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
  for (const [unit, value] of Object.entries(remaining)) units[unit].textContent = String(value).padStart(2, '0');
  timer.setAttribute('aria-label', `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until launch`);
  if (totalSeconds === 0) {
    caption.textContent = 'The countdown is complete. Our website is on its way.';
    clearInterval(intervalId);
  }
}

renderCountdown();
if (Number.isFinite(launchTime) && launchTime > Date.now()) intervalId = setInterval(renderCountdown, 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) renderCountdown(); });