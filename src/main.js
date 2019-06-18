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

function init() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      copyToClipboard(e.currentTarget.textContent);
    });
  });
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
