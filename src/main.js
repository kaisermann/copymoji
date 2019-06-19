const MAX_RECENTLY_USED = 20;
let recentlyList;

function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.contentEditable = true;
  el.readOnly = true;
  el.style.position = 'absolute';
  el.style.left = '-9999px';

  document.body.appendChild(el);

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const range = document.createRange();
    range.selectNodeContents(el);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
  } else {
    el.select();
  }

  document.execCommand('copy');
  document.body.removeChild(el);
}

function getRecentlyUsed() {
  return JSON.parse(localStorage.getItem('recently')) || [];
}

function saveToRecentlyUsed(emoji) {
  let recentlyUsed = getRecentlyUsed();
  recentlyUsed = [
    ...new Set([emoji, ...recentlyUsed.slice(0, MAX_RECENTLY_USED - 1)]),
  ];
  localStorage.setItem('recently', JSON.stringify(recentlyUsed));
}

function updateRecentlyUsed() {
  recentlyList.innerHTML = getRecentlyUsed()
    .map(emoji => `<li><button class="copy-btn">${emoji}</button></li>`)
    .join('');
}

function init() {
  recentlyList = document.querySelector('#recently');

  // fix for button:active on iOS
  document.addEventListener('touchstart', () => {}, false);
  document.body.addEventListener('click', e => {
    if (!e.target.classList.contains('copy-btn')) {
      return;
    }
    saveToRecentlyUsed(e.target.textContent);
    copyToClipboard(e.target.textContent);
    updateRecentlyUsed();
  });

  updateRecentlyUsed();
}

if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, false);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
