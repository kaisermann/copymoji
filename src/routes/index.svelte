<script>
  import emojiData from '../emojis.json';
  import EmojiList from '../components/EmojiList.svelte';

  const emojis = emojiData.map((emoji) => {
    if (typeof emoji === 'string') return emoji;
    return {
      ...emoji,
      tags: emoji.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
  });
</script>

<svelte:head>
  <title>copymoji</title>
</svelte:head>

<EmojiList {emojis} />
