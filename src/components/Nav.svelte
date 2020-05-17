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
    transform: scale(1.05);
  }

  a {
    display: inline-block;
    padding: 0.8rem 0.4rem;
  }

  @media (min-width: 540px) {
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
    <a class:selected={segment === undefined} href=".">home</a>
    <a class:selected={segment === 'recently'} href="recently">recently</a>
    <a class:selected={segment === 'creator'} href="creator">creator</a>
  </nav>
  <div class="search">
    <Search />
  </div>
</header>
