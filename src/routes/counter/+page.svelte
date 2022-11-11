<script lang="ts">
  import { countService, computeService } from '$lib/service';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const counter = writable(null);

  async function sync() {
    await countService.update($counter);
    counter.set(await countService.first());
  }

  async function reset() {
    $counter.count = 0;
    sync();
  }

  async function increment() {
    $counter.count = await computeService.count($counter.count);
    sync();
  }

  async function decrement() {
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
      <button
        class="transition ease-in-out p-5 m-5 rounded-full bg-[#3c3836] hover:-translate-y-5 hover:bg-[#689d6a] text-center align-middle shadow-2xl"
        data-testid="increment"
        on:click={increment}
        type="button"
      >
        Increment
      </button>

      <button
        class="transition ease-in-out p-5 m-5 rounded-full bg-[#3c3836] hover:-translate-y-5 hover:bg-[#689d6a] text-center align-middle shadow-2xl"
        data-testid="decrement"
        on:click={decrement}
        type="button"
      >
        Decrement
      </button>
    </div>
    <button
      class="transition ease-in-out p-5 m-5 rounded-full bg-[#3c3836] hover:-translate-y-5 hover:bg-[#689d6a] text-center align-middle shadow-2xl"
      data-testid="reset"
      on:click={reset}
      type="button"
    >
      Reset
    </button>
  {/if}
</main>

<style></style>
