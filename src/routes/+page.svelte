<script lang="ts">
  import Link from '$lib/components/link.svelte';
  let games = [
    { name: 'Tic Tac Toe', link: '/tictactoe' },
    { name: 'Counter', link: '/counter' },
  ];
</script>

<main>
  <h2 class="text-5xl pb-20">New Game Plus</h2>
  <section class="grid grid-cols-2">
    {#each games as game}
      <Link href={game.link}>
        {game.name}
      </Link>
    {/each}
  </section>
</main>

<style>
</style>
