<script>
  import Search from './Search.svelte';
  export let segment;
</script>

<style>
  header {
    padding: 0 0.4rem;
    top: 0;
    left: 0;
  }

  .selected {
    font-weight: bold;
    text-decoration: none;
  }

  a {
    display: inline-block;
    padding: 0.8rem 0.4rem;
  }

  @media (max-width: 540px) {
    .search {
      padding: 0 0.4rem;
    }
  }
  @media (min-width: 541px) {
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .search {
      width: 12rem;
    }
  }
</style>

<header>
  <nav>
    <a class="btn" class:selected={segment === undefined} href=".">home</a>
    <a class="btn" class:selected={segment === 'recently'} href="recently">
      recently
    </a>
    <a class="btn" class:selected={segment === 'creator'} href="creator">
      creator
    </a>
  </nav>
  {#if segment == null || segment == 'recently'}
    <div class="search">
      <Search />
    </div>
  {/if}
</header>
