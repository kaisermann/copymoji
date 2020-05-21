<script>
  import VirtualList from '@sveltejs/svelte-virtual-list'
  import { slide } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import * as Utils from './utils.js'
  import { getRandomItem } from '../../modules/random'
  import CloseIcon from '../icons/Close.svelte'
  import ShuffleIcon from '../icons/Shuffle.svelte'

  const dispatch = createEventDispatcher()

  let collapsed = true

  export let title = 'n/a'
  export let template = null
  export let parts = null
  export let allowEmpty = false
  export let sides = false

  $: leftProps = Utils.getSideProps('left', parts.props)
  $: rightProps = Utils.getSideProps('right', parts.props)

  function getRandom(size) {
    Math.floor(Math.random() * possibilities.length)
  }

  function select(part) {
    dispatch('select', Utils.assign(template, Utils.assign(template, part)))
  }

  function clear(partProps) {
    dispatch('clear', Utils.removeParts(template, partProps))
  }

  function handleShuffle() {
    // const hasLeft = Utils.hasSideParts('left', template)
    // const hasRight = Utils.hasSideParts('right', template)
    // const hasSides = hasLeft && hasRight

    let possibilities = [
      'select-both',
      sides && 'select-left',
      sides && 'select-right',
    ].filter(Boolean)

    const observation = getRandomItem(possibilities)

    if (observation === 'clear-both') {
      return clear(parts.props)
    }

    if (observation === 'clear-left') {
      return clear(leftProps)
    }

    if (observation === 'cleat-right') {
      return clear(rightProps)
    }

    const randomPart = getRandomItem(parts.list)

    if (observation === 'select-both') {
      return select(randomPart)
    }

    if (observation === 'select-left') {
      return select(Utils.ignoreParts(randomPart, rightProps))
    }

    if (observation === 'select-right') {
      return select(Utils.ignoreParts(randomPart, leftProps))
    }
  }
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

  .select-btn {
    font-size: 1.4rem;
    opacity: 0.6;
    padding: 0.8rem;
  }

  .select-btn:hover {
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
    margin-left: 1rem;
  }

  .control-btn.active {
    background-color: white;
    color: black;
    outline: 1px solid black;
  }

  .control-btn:disabled {
    opacity: 0.2;
  }

  .list {
    margin: 0;
    padding: 1px 1rem 1px 1px;
    overflow: auto;
  }

  .item {
    display: flex;
    padding: 1px;
  }

  .item:hover .side-btns,
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
      title="{`${title} - click to ${collapsed ? 'expand' : 'collapse'}`}"
      aria-expanded="{collapsed}"
      on:click="{() => (collapsed = !collapsed)}"
    >
      {title}
    </button>
    <button
      title="remove parts"
      class="btn control-btn"
      disabled="{allowEmpty === false}"
      on:click="{() => clear(parts.props)}"
    >
      <CloseIcon />
    </button>
    <button title="shuffle" class="btn control-btn" on:click="{handleShuffle}">
      <ShuffleIcon />
    </button>
  </div>

  {#if collapsed === false}
    <div class="list" transition:slide="{{ duration: 300 }}">
      <VirtualList height="27rem" items="{parts.list}" let:item="{part}">
        <div class="item">
          <button
            title="select"
            class="btn select-btn emoji-btn"
            on:click="{() => select(part)}"
          >
            {Utils.format(Utils.assign(template, part))}
          </button>

          {#if sides}
            <div class="side-btns">
              <button
                title="only add left side"
                class="btn control-btn"
                class:active="{Utils.hasSomeSpecificPart(template, part, leftProps)}"
                disabled="{Utils.hasSideParts('left', part) === false}"
                on:click="{() => {
                  if (Utils.hasSomeSpecificPart(template, part, leftProps)) {
                    clear(leftProps)
                  } else {
                    select(Utils.ignoreParts(part, rightProps))
                  }
                }}"
              >
                L
              </button>
              <button
                title="only add right side"
                class="btn control-btn"
                class:active="{Utils.hasSomeSpecificPart(template, part, rightProps)}"
                disabled="{Utils.hasSideParts('right', part) === false}"
                on:click="{() => {
                  if (Utils.hasSomeSpecificPart(template, part, rightProps)) {
                    clear(rightProps)
                  } else {
                    select(Utils.ignoreParts(part, leftProps))
                  }
                }}"
              >
                R
              </button>
            </div>
          {/if}

        </div>
      </VirtualList>
    </div>
  {/if}
</div>
