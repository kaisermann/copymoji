<script>
  import { createEventDispatcher } from 'svelte';

  import CloseIcon from '../icons/Close.svelte';

  const dispatch = createEventDispatcher();

  export let sides = false;
</script>

<style>
  .controls {
    display: flex;
    align-items: stretch;
  }

  .control-btn {
    color: white;
    font-size: 0.8rem;
    line-height: 0;
    padding: 0.4rem;
    width: 40px;
    height: 40px;
  }

  .control-btn + .control-btn {
    margin-left: 0.4rem;
  }
</style>

<div class="controls">
  <button class="btn control-btn" on:click={() => dispatch('clear')}>
    <CloseIcon />
  </button>

  {#if sides}
    <button class="btn control-btn" on:click={() => dispatch('clear-left')}>
      L
    </button>

    <button class="btn control-btn" on:click={() => dispatch('clear-right')}>
      R
    </button>
  {/if}
</div>
