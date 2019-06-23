<script>
  import CopyBtn from './CopyButton.svelte';

  export let emojis;
</script>

<style>
  ul {
    display: block;
    margin: 0 0 0.8rem;
    padding: 2rem 0 0;
    column-count: 5;
  }

  li {
    display: inline-block;
    width: 100%;
    padding: 0.8rem;
  }

  @media (max-width: 1280px) {
    ul {
      column-count: 4;
    }
  }

  @media (max-width: 1020px) {
    ul {
      column-count: 3;
    }
  }

  @media (max-width: 768px) {
    ul {
      column-count: 2;
    }
  }

  @media (max-width: 480px) {
    ul {
      column-count: 1;
    }
  }
</style>

<ul>
  {#each emojis as emoji}
    <li>
      <CopyBtn>{emoji}</CopyBtn>
    </li>
  {/each}
</ul>
