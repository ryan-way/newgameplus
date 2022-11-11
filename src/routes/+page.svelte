<script lang="ts">
  let games = [
    { name: 'Tic Tac Toe', link: '/tictactoe' },
    { name: 'Counter', link: '/counter' },
  ];
</script>

<main>
  <h2 class="text-5xl pb-20">New Game Plus</h2>
  <section class="grid grid-cols-2">
    {#each games as game}
      <a
        class="transition ease-in-out p-5 m-5 rounded-full bg-[#3c3836] hover:-translate-y-5 hover:bg-[#689d6a] text-center align-middle"
        href={game.link}
      >
        {game.name}
      </a>
    {/each}
  </section>
</main>

<style>
</style>
