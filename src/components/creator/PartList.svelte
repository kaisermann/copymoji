<script>
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import * as Utils from './utils.js';
  import CloseIcon from '../icons/Close.svelte';

  const dispatch = createEventDispatcher();

  let collapsed = true;

  export let title = 'n/a';
  export let template = null;
  export let parts = null;
  export let allowEmpty = false;
  export let sides = false;

  $: leftProps = Utils.getSideProps('left', parts.props);
  $: rightProps = Utils.getSideProps('right', parts.props);
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

  .title:hover,
  .title:focus {
    opacity: 1;
  }

  .select-button {
    font-size: 1.4rem;
    opacity: 0.6;
    padding: 0.8rem;
  }

  .select-button:hover {
    opacity: 1;
  }

  .control-btn {
    color: white;
    font-size: 1rem;
    line-height: 0;
    padding: 0.4rem;
    width: 40px;
    height: 40px;
    text-align: center;
    font-weight: bold;
  }

  .control-btn.active {
    background-color: white;
    color: black;
    outline: 1px solid black;
  }
  .control-btn:disabled {
    opacity: 0.2;
  }

  ul {
    margin: 0;
    padding: 1px 1rem 1px 1px;
    max-height: 27rem;
    overflow: auto;
  }

  li {
    display: flex;
  }

  li:hover .side-btns,
  button:focus + .side-btns {
    visibility: visible;
  }

  .side-btns {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }
</style>

<div class="wrapper">
  <div class="top">
    <button
      class="btn title"
      title={`${title} - click to ${collapsed ? 'expand' : 'collapse'}`}
      aria-expanded={collapsed}
      on:click={() => (collapsed = !collapsed)}>
      {title}
    </button>
    {#if allowEmpty}
      <button
        title="remove parts"
        class="btn control-btn"
        on:click={() => dispatch('clear', Utils.removeParts(template, parts.props))}>
        <CloseIcon />
      </button>
    {/if}
  </div>

  {#if collapsed === false}
    <ul transition:slide={{ duration: 300 }}>
      {#each parts.list as part}
        <li>
          <button
            title="select"
            class="btn select-button"
            on:click={() => dispatch('select', Utils.assign(template, part))}>
            {Utils.format(Utils.assign(template, part))}
          </button>

          {#if sides}
            <div class="side-btns">
              <button
                title="only add left side"
                class="btn control-btn"
                class:active={Utils.hasSomeSpecificPart(template, part, leftProps)}
                disabled={Utils.hasSideProps('left', part) === false}
                on:click={() => {
                  if (Utils.hasSomeSpecificPart(template, part, leftProps)) {
                    dispatch('clear', Utils.removeParts(template, leftProps));
                  } else {
                    dispatch('select', Utils.assign(template, Utils.ignoreParts(part, rightProps)));
                  }
                }}>
                L
              </button>
              <button
                title="only add right side"
                class="btn control-btn"
                class:active={Utils.hasSomeSpecificPart(template, part, rightProps)}
                disabled={Utils.hasSideProps('right', part) === false}
                on:click={() => {
                  if (Utils.hasSomeSpecificPart(template, part, rightProps)) {
                    dispatch('clear', Utils.removeParts(template, rightProps));
                  } else {
                    dispatch('select', Utils.assign(template, Utils.ignoreParts(part, leftProps)));
                  }
                }}>
                R
              </button>
            </div>
          {/if}

        </li>
      {/each}
    </ul>
  {/if}
</div>
