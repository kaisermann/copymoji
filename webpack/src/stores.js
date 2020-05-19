import { writable } from 'svelte/store';

const is_browser = typeof window !== 'undefined';

export let recently = writable(
  is_browser ? JSON.parse(localStorage.getItem('recently')) || [] : [],
);

if (is_browser) {
  recently.subscribe((value) => {
    localStorage.setItem('recently', JSON.stringify(value));
  });
}

export let searchQuery = writable('');
export let searchElement = writable('');
