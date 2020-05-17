export function copyToClipboard(str) {
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
