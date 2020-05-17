<script>
  import VirtualList from '@sveltejs/svelte-virtual-list';

  import CopyBtn from './CopyButton.svelte';
  import { searchQuery, searchElement, recently } from '../stores.js';

  const MAX_RECENTLY_USED = 40;

  export let emojis;

  function saveToRecentlyUsed(emojiData) {
    $recently = [
      emojiData,
      ...$recently.filter((e) => e.emoji !== emojiData.emoji),
    ];
  }

  function handleKeyPress(e) {
    if (document.activeElement !== document.body || e.metaKey) {
      return;
    }

    const { key, keyCode } = e;

    if (!$searchElement) {
      return;
    }

    if (keyCode >= 65 && keyCode <= 90) {
      $searchElement.focus();
    }
  }

  function handleCopy(emoji) {
    saveToRecentlyUsed(emoji);
  }

  let filteredEmojis;
  $: {
    if ($searchQuery === '') {
      filteredEmojis = emojis;
    } else {
      const terms = $searchQuery.split(/,| /g).filter(Boolean);
      filteredEmojis = emojis.filter((emoji) => {
        if (typeof emoji === 'string') {
          return false;
        }

        return terms.every((term) =>
          emoji.tags.some(
            (tag) => tag && (tag.includes(term) || term.includes(tag)),
          ),
        );
      });
    }
  }

  let start;
  let end;
</script>

<style>
  .wrapper {
    height: 100%;
    overflow: hidden;
    text-align: center;
  }

  .item {
    display: inline-block;
    position: relative;
    margin: 0.2rem 0;
    text-align: center;
  }

  .item::before {
    content: attr(data-tags);
    display: flex;
    justify-content: center;
    position: absolute;
    width: max-content;
    padding: 0 0.4rem;
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s step-end;
    font-size: 0.6rem;
    white-space: nowrap;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .item:hover::before {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 580px) {
    .item::before {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (min-width: 581px) {
    .item::before {
      top: 50%;
      transform: translateY(-50%);
      left: calc(100% + 0.5rem);
    }
  }
</style>

<!-- <p>{start}-{end}/{filteredEmojis.length} emojis</p> -->
<div class="wrapper">
  <VirtualList items={filteredEmojis} let:item={emoji} bind:start bind:end>
    <div class="item" data-tags={emoji.tags.join(', ')}>
      <CopyBtn on:copy={() => handleCopy(emoji)}>
        <span class="emoji">{emoji.emoji}</span>
      </CopyBtn>
    </div>
  </VirtualList>
</div>

<svelte:window on:keydown={handleKeyPress} />
