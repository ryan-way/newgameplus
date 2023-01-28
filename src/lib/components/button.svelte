<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let testid: String;

  const dispatch = createEventDispatcher();

  function click() {
    dispatch('click');
  }
</script>

<button
  on:click={click}
  data-testid={testid}
  class="place-self-center
    transition
    ease-in-out
    p-5 m-5
    max-w-fit
    rounded-full
    bg-[#3c3836]
    hover:-translate-y-5
    hover:bg-[#689d6a]
    text-center
    align-middle
    shadow-2xl"
  type="button"
>
  <slot />
</button>
