<script lang="ts">
  import { getStore } from '$lib/stores/tictactoe';
  import type { ITicTacToeStore } from '$lib/stores/tictactoe';
  import type { Move } from '$lib/gamestate/tictactoe';
  import { onMount } from 'svelte';

  let store: ITicTacToeStore = getStore();
  const { board, winner, isGameOver } = store.getStores();

  let mode: 'PvP' | 'PvC' = 'PvC';
  let humanFirst: boolean = true;

  async function play(rowIdx: number, cellIdx: number) {
    let move = (rowIdx * 3 + cellIdx) as Move;
    store.Play(move as Move);
    if (mode == 'PvC') {
      move = await store.getComputerMove();
      store.Play(move);
    }
  }

  async function reset() {
    store.Reset();

    if (mode == 'PvC' && !humanFirst) {
      let move = await store.getComputerMove();
      store.Play(move);
    }
  }

  $: opponent = mode == 'PvP' ? 'Player 2' : 'Computer';
  $: player = mode == 'PvP' ? 'Player 1' : 'Player';

  onMount(() => {
    humanFirst = true;
    mode = 'PvC';
  });
</script>

<main>
  <h2>Tic Tac Toe</h2>
  <div role="board">
    {#each $board as row, rowIdx}
      <row>
        {#each row as cell, cellIdx}
          <div on:click={() => play(rowIdx, cellIdx)}>
            <h2 role="cell">{cell}</h2>
          </div>
        {/each}
      </row>
    {/each}
  </div>
  <button
    on:click={() => {
      reset();
    }}
  >
    {$isGameOver ? 'Start Over' : 'New Game'}
  </button>
  <br />
  {#if $isGameOver}
    <h4>The winner is {$winner == 1 ? player : opponent}</h4>
    <br />
  {/if}
  <div legendText="Opponent">
    <input type="radio" label="Human" />
    <input type="radio" label="Computer" />
  </div>
  {#if mode == 'PvC'}
    <br />
    <div legendText="First Turn">
      <input type="radio" label="You" />
      <input type="radio" label="Them" />
    </div>
  {/if}
</main>

<style>
  main {
    display: grid;
    justify-content: center;
    text-align: center;
  }

  row {
    display: flex;
  }
</style>
