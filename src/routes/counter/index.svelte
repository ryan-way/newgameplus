<script lang="ts">
  let number = 9;

  function reset() {
    number = 0;
  }

  function increment() {
    number++;
  }
</script>

<main>
  <h1>Counter</h1>

  <h1>{number}</h1>

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
