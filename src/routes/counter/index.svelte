<script lang="ts">
  import { countService, computeService } from '$lib/service';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const count = writable(null);

  async function reset() {
    $count.count = 0;
    await countService.update($count);
    count.set(await countService.first());
  }

  async function increment() {
    $count.count = await computeService.count($count.count);
    await countService.update($count);
    count.set(await countService.first());
  }

  onMount(async () => {
    count.set(await countService.first());
  });
</script>

<main>
  <h1>Counter</h1>
  {#if $count}
    <h1>{$count.count}</h1>
  {/if}

  <button on:click={increment} type="button">Increment</button>
  <button on:click={reset} type="button">Reset</button>
</main>

<style>
  main {
    display: block;
    text-align: center;
  }

  button {
    padding: 10px;
  }
</style>
