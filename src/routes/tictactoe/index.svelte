<script lang="ts">
  import { Tile, Modal, ComboBox, Toggle, Button } from 'carbon-components-svelte';
  import { onMount } from 'svelte';

  type Cell= ' ' | 'O' | 'X';
  type Row = [Cell, Cell, Cell];
  type Board = [Row, Row, Row];

  type Settings = { opponent: 'Player' | 'Computer', first: bool };

  let board: Board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]
  let settings: Settings = {
    opponent: 'Player',
    first: true,
  }
  let newGameDialog = false;

  let selectedId: string = '0';

  $: settings.opponent = selectedId === '0' ? 'Player' : 'Computer';

  function assignCell(rowIdx, cellIdx) {
    board[rowIdx][cellIdx] = 'X';
    board = [...board];
  }

  function askSettings() {
    newGameDialog = true;
  }

  function newGame() {
    board = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']]
  }

  onMount(() => {
    askSettings();
  }) 

</script>

<main>
  <h2>Tic Tac Toe</h2>
  {#each board as row, rowIdx}
    <row>
      {#each row as cell, cellIdx}
        <Tile on:click={() => assignCell(rowIdx, cellIdx)}
          light={(rowIdx + cellIdx) % 2 === 0}>
          <h2>{cell}</h2>
        </Tile>
      {/each}
    </row>
  {/each}
  <p>Playing: {settings.opponent}</p>
  {#if settings.opponent == 'Computer'}
    <p>Player is going: {settings.first? 'first' : 'second'}</p>
  {/if}
  <Button on:click={newGame}>New Game</Button>
  <Modal
    size="lg"
    bind:open={newGameDialog}
    on:submit={() => {
      newGameDialog = false;
      newGame();
    }}
    on:click:button--secondary={() => newGameDialog = false}
    hasScrollingContent
    primaryButtonText="Start"
    secondaryButtonText="Go back"
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
