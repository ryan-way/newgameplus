<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import { countService, computeService, logService } from '$lib/service';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const counter = writable(null);

  async function sync() {
    logService.info('Counter: syncing counter');
    await countService.update($counter);
    counter.set(await countService.first());
  }

  async function reset() {
    logService.info('Counter: reseting...');
    $counter.count = 0;
    sync();
  }

  async function increment() {
    logService.info('Counter: incrementing...');
    $counter.count = await computeService.count($counter.count);
    sync();
  }

  async function decrement() {
    logService.info('Counter: decrementing...');
    $counter.count -= 1;
    sync();
  }

  onMount(async () => {
    counter.set(await countService.first());
  });
</script>

<main class="text-inherit">
  <h2 class="text-5xl pb-20" data-testid="counter">Counter</h2>
  {#if $counter}
    <h1
      class="text-5xl p-2 mb-10 bg-[#d65d0e] rounded-full mx-80 align-middle shadow-2xl"
      data-testid="count"
    >
      {$counter.count}
    </h1>

    <div>
      <Button testid="increment" on:click={increment}>Increment</Button>

      <Button testid="decrement" on:click={decrement}>Decrement</Button>
    </div>

    <Button testid="reset" on:click={reset}>Reset</Button>
  {/if}
</main>

<style></style>
