<script>
  import { slide } from 'svelte/transition';
  import { bounceInOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let collapsed = true;

  export let title = 'n/a';
  export let items = [];
</script>

<style>
  button {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    color: white;
    font-family: monospace;
  }

  .title {
    font-size: 1.2rem;
    opacity: 0.8;
  }

  .title:hover {
    opacity: 1;
  }

  ul {
    margin: 0;
    padding-left: 1rem;
  }

  .select-button {
    font-size: 1rem;
    opacity: 0.6;
    padding: 0.4rem 0;
  }

  .select-button:hover {
    opacity: 1;
  }
</style>

<div class="wrapper">
  <button class="title" on:click={() => (collapsed = !collapsed)}>
    {title}
  </button>

  {#if collapsed === false}
    <ul transition:slide={{ duration: 300, easing: bounceInOut }}>
      {#each items as item}
        <li>
          <button
            class="select-button"
            on:click={() => dispatch('select', item)}>
            <slot {item} />
          </button>

        </li>
      {/each}
    </ul>
  {/if}
</div>
