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
    font-size: 1.2rem;
  }

  .copy-btn::before {
    content: 'COPIED';
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: monospace;
    font-size: 23vw;
    pointer-events: none;
    transition: visibility 0.2s ease;
    visibility: hidden;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .copy-btn:active::before {
    visibility: visible;
    transition: none;
  }
</style>

<button class="btn copy-btn" on:click={handleClick}>
  <slot />
</button>
