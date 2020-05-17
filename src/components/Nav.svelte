<script>
  import Search from './Search.svelte';
  export let segment;
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    top: 0;
    left: 0;
  }

  .selected {
    font-weight: bold;
    text-decoration: none;
    transform: scale(1.05);
  }

  a {
    display: inline-block;
    padding: 0.8rem 0.4rem;
  }
</style>

<header>
  <nav>
    <a class="goto-main" class:selected={segment === undefined} href=".">
      home
    </a>
    <a
      class="goto-recently"
      class:selected={segment === 'recently'}
      href="recently">
      recently
    </a>
  </nav>
  <Search />
</header>
