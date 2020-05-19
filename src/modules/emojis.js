import emojiData from '../emojis.json';

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

export function getRandomListedEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export function getEmojiList() {
  return emojis;
}
