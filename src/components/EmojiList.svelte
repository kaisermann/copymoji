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
  }

  .item {
    text-align: center;
    margin: 0.2rem 0;
  }
</style>

<!-- <p>{start}-{end}/{filteredEmojis.length} emojis</p> -->
<div class="wrapper">
  <VirtualList items={filteredEmojis} let:item={emoji} bind:start bind:end>
    <div class="item">
      <CopyBtn on:copy={() => handleCopy(emoji)}>
        <span class="emoji">{emoji.emoji}</span>
      </CopyBtn>
    </div>
  </VirtualList>
</div>

<svelte:window on:keydown={handleKeyPress} />
