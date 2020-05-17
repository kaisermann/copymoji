<script>
  import { createEventDispatcher } from 'svelte';
  import { recently } from '../stores.js';
  import { copyToClipboard } from '../modules/copyToClipboard.js';

  const dispatch = createEventDispatcher();

  function handleClick(e) {
    copyToClipboard(e.target.textContent);
    dispatch('copy', e);
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

  .copy-btn::before {
    content: 'COPIED';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: monospace;
    font-size: 23vw;
    pointer-events: none;
    transition: visibility 0.2s ease;
    visibility: hidden;
  }

  .copy-btn:active::before {
    visibility: visible;
    transition: none;
  }
</style>

<button class="copy-btn" on:click={handleClick}>
  <slot />
</button>
