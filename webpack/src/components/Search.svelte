<script>
  import { searchQuery, searchElement } from '../stores.js';
</script>

<style>
  input {
    border: none;
    background: transparent;
    border-bottom: 2px solid white;
    color: white;
    font-family: monospace;
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    width: 100%;
  }

  input:focus {
    outline: none;
    outline: 2px solid white;
  }
</style>

<div class="search">
  <input
    bind:this={$searchElement}
    type="search"
    aria-label="i'm looking for..."
    placeholder="i'm looking for..."
    bind:value={$searchQuery} />
  <br />
</div>
