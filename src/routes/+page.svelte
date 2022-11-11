<script lang="ts">
  import ClickableTile from 'carbon-components-svelte/src/Tile/ClickableTile.svelte';

  let games = [
    { name: 'Tic Tac Toe', link: '/tictactoe' },
    { name: 'Counter', link: '/counter' },
  ];
</script>

<main>
  <h2>Welcome to the Game App</h2>
  {#each games as game}
    <ClickableTile href={game.link}>
      {game.name}
    </ClickableTile>
  {/each}
</main>

<style></style>
