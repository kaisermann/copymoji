import { writable, derived } from 'svelte/store';

import { getRandomListedEmoji } from './modules/emojis.js';

const isBrowser = typeof window !== 'undefined';

export const recently = writable(
  isBrowser ? JSON.parse(localStorage.getItem('recently')) || [] : [],
);

if (isBrowser) {
  recently.subscribe((value) => {
    localStorage.setItem('recently', JSON.stringify(value));
  });
}

export const searchQuery = writable('');
export const searchElement = writable('');

export const titleEmoji = writable(getRandomListedEmoji().emoji);
setInterval(() => titleEmoji.set(getRandomListedEmoji().emoji), 4000);

export const getTitle = derived(titleEmoji, ($emoji) => (title) =>
  `${$emoji} - ${title}`,
);
