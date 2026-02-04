<script lang="ts">
  import { currentPage } from './stores/routerStore'
  import Home from './pages/Home.svelte'
  import LinearRegression from './pages/LinearRegression.svelte'
  import KNN from './pages/KNN.svelte'
  import Generative from './pages/Generative.svelte'
</script>

{#if $currentPage === 'home'}
  <Home />
{:else if $currentPage === 'linear-regression'}
  <LinearRegression />
{:else if $currentPage === 'knn'}
  <KNN />
{:else if $currentPage === 'generative'}
  <Generative />
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
