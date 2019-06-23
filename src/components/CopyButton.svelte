<script>
  import { recently } from '../stores.js';

  const MAX_RECENTLY_USED = 40;

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
    $recently = [
      ...new Set([emoji, ...$recently.slice(0, MAX_RECENTLY_USED - 1)]),
    ];
  }

  function handleClick(e) {
    copyToClipboard(e.target.textContent);
    saveToRecentlyUsed(e.target.textContent);
  }
</script>

<style>
  .copy-btn {
    display: inline-block;
    padding: 0.8rem;
    border: none;
    width: max-content;
    background-color: #000;
    color: inherit;
    font-family: Roboto, Helvetica neue, Helvetica, Arial, sans-serif;
    font-size: 1.2rem;
    white-space: nowrap;
    cursor: pointer;
  }

  .copy-btn:hover {
    background-color: #000;
    color: #fff;
  }

  .copy-btn:focus,
  .copy-btn:hover,
  .copy-btn:active {
    outline: 1px solid #fff;
  }
  .copy-btn:focus {
    outline-offset: -4px;
  }
  .copy-btn:active {
    outline-offset: -8px;
  }
  .copy-btn:active::before {
    content: 'COPIED';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: monospace;
    font-size: 23vw;
    pointer-events: none;
  }
</style>

<button class="copy-btn" on:click={handleClick}>
  <slot />
</button>
