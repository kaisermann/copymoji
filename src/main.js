function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
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
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(null, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
