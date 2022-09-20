<script lang="ts">
  import { Tile, Modal, ComboBox, Toggle, Button, ToastNotification } from 'carbon-components-svelte';
  import { TicTacToe } from '$lib/gamestate/tictactoe';
  import type { Board } from '$lib/gamestate/tictactoe';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';


  type State = 'newgame' | 'playing' | 'gameover';
  type Settings = { opponent: 'Player' | 'Computer', first: boolean };

  let board: Board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]
  let winner = undefined;
  let state: Writable<State> = writable('newgame');
  let settings: Settings = {
    opponent: 'Player',
    first: true,
  }


  let game = new TicTacToe(JSON.parse(JSON.stringify(board)));

  let selectedId: string = '0';

  state.subscribe(state => {
    winner = game.Winner;
  })

  $: settings.opponent = selectedId === '0' ? 'Player' : 'Computer';
  $: newGameDialogOpen = $state == 'newgame';
  $: gameOverDialogOpen = $state == 'gameover';

  function performMove(rowIdx, cellIdx) {
    console.log("Performing Move at: ", [rowIdx, cellIdx]);
    game.Move(rowIdx, cellIdx);
    if (settings.opponent == 'Computer') {
      let [rowIdx, cellIdx] = getComputerMove();
      console.log(rowIdx, cellIdx);
      game.Move(rowIdx, cellIdx);
    }
    board = game.Board;
    if (game.GameOver) {
      state.set('gameover');
    }
  }

  function getComputerMove() {
    let flatIdx = board.flat().findIndex(cell => cell == ' ');
    console.log("Computer picked:", flatIdx);
    return [Math.floor(flatIdx / 3), flatIdx % 3];
  }

  function reset() {
    state.set('playing');
    game.Reset();
    board = game.Board;
  }

  onMount(() => {
  }) 
</script>

<main>
  <h2>Tic Tac Toe</h2>
  {#each board as row, rowIdx}
    <row>
      {#each row as cell, cellIdx}
        <Tile on:click={() => performMove(rowIdx, cellIdx)}
          light={(rowIdx + cellIdx) % 2 === 0}>
          <h2>{cell}</h2>
        </Tile>
      {/each}
    </row>
  {/each}
  <Button on:click={() => {
    state.set('newgame');
  }}>New Game</Button>
  <p>Playing: {settings.opponent}</p>
  {#if settings.opponent == 'Computer'}
    <p>Player is going: {settings.first? 'first' : 'second'}</p>
  {/if}
  <p>Game State: {$state}</p>
  <Modal
    size="lg"
    bind:open={newGameDialogOpen}
    on:submit={reset}
    on:click:button--secondary={() => state.set('playing')}
    hasScrollingContent
    primaryButtonText="Start"
    secondaryButtonText="Go Back"
    modalHeading="New Game">
    <ComboBox
      bind:selectedId
      items={[
        { id: '0', text: 'Player'},
        { id: '1', text: 'Computer'}
        ]}
      titleText="Opponent">
    </ComboBox> 
    {#if settings.opponent == 'Computer'}
      <Toggle
          bind:toggled={settings.first}>
        <span slot="labelA">Go Second</span>
        <span slot="labelB">Go First</span>
      </Toggle>
    {/if}
  </Modal>
  <Modal
      size="lg"
      bind:open={gameOverDialogOpen}
      on:submit={() => {
        state.set('newgame');
      }}
      on:click:button--secondary={() => state.set('playing')}
      primaryButtonText="New Game"
      secondaryButtonText="Go Back"
      modalHeading="Game Over"
        >
      The winner is {winner}
  </Modal>
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
