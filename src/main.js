import initSwipe from './swipe.js';

const MAX_RECENTLY_USED = 40;
let recentlyList;

function h(tag, props = {}, children) {
  const el = document.createElement(tag.toUpperCase());

  if (props) {
    Object.keys(props).forEach(key => {
      el[key] = props[key];
    });
  }

  if (children) {
    children.forEach(c => el.appendChild(c));
  }

  return el;
}

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

function updateRecentlyUsedList() {
  const recentlyBtns = recentlyList.childNodes;
  const recentlyUsed = getRecentlyUsed();

  // update button texts (create items if needed)
  recentlyUsed.forEach((key, i) => {
    let liEl = recentlyBtns[i];
    if (!liEl) {
      liEl = h('li', null, [h('button', { className: 'copy-btn' })]);
      recentlyList.appendChild(liEl);
    }
    liEl.childNodes[0].textContent = key;
  });

  // remove extra items
  while (recentlyBtns[recentlyUsed.length]) {
    recentlyList.removeChild(recentlyBtns[recentlyUsed.length]);
  }
}

function init() {
  recentlyList = document.querySelector('.recently-list');
  initSwipe();

  // fix for button:active on iOS
  document.addEventListener('touchstart', () => {}, false);
  document.body.addEventListener('click', e => {
    if (!e.target.classList.contains('copy-btn')) {
      return;
    }
    saveToRecentlyUsed(e.target.textContent);
    copyToClipboard(e.target.textContent);
    updateRecentlyUsedList();
  });

  updateRecentlyUsedList();
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
