<script>
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let collapsed = false;

  export let title = 'n/a';
  export let items = [];
</script>

<style>
  .top {
    display: flex;
    align-items: center;
  }

  button {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    color: white;
    font-family: monospace;
    text-align: left;
  }

  .wrapper {
    padding: 1px;
  }

  .title {
    font-size: 1.6rem;
    opacity: 0.8;
    padding: 0.4rem;
  }

  .title:hover {
    opacity: 1;
  }

  ul {
    margin: 0;
    padding: 1px 1rem 1px 1px;
    max-height: 27rem;
    overflow: auto;
  }

  .select-button {
    font-size: 1.4rem;
    opacity: 0.6;
    padding: 0.8rem;
    width: 100%;
  }

  .select-button:hover {
    opacity: 1;
  }
</style>

<div class="wrapper">
  <div class="top">
    <button class="btn title" on:click={() => (collapsed = !collapsed)}>
      {title}
    </button>
    <slot name="controls" />
  </div>

  {#if collapsed === false}
    <ul transition:slide={{ duration: 300 }}>
      {#each items as item}
        <li>
          <button
            class="btn select-button"
            on:click={() => dispatch('select', item)}>
            <slot {item} />
          </button>

        </li>
      {/each}
    </ul>
  {/if}
</div>
