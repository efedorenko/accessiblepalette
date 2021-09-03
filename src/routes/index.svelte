<script>
  import Palette from '../components/Palette.svelte';
  import Description from '../components/Description.svelte';
</script>

<div class='palette-container'>
  <Palette />
</div>

<Description />

<style>
  :global(:root) {
    --c-slate-50: #F9F9FA;
    --c-slate-100: #EAECEF;
    --c-slate-200: #DBDFE4;
    --c-slate-300: #C1C6D1;
    --c-slate-400: #A7AFBD;
    --c-slate-500: #8793A6;
    --c-slate-600: #6B778C;
    --c-slate-700: #525B6B;
    --c-slate-800: #3A404C;
    --c-slate-900: #23272E;

    --c-rulers: #E8EBF0;
    --c-meta: #6B778C;
  }
  :global(body) {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #353149;
    color: #FFF;
    font: 1rem Inter, sans-serif;
  }
  :global(
    input[type="number"],
    input[type="text"]
  ) {
    margin: 0;
    border: 1px solid var(--c-slate-200);
    border-radius: 2px;
    padding: .2em .4em;
    font-family: Inter, sans-serif;
  }
  :global(input[type="number"]) {
    padding-right: 0;
  }
  :global(
    input[type="number"]:focus,
    input[type="text"]:focus
  ) {
    outline: none;
    box-shadow: 0 0 0 2px #DCEFF8;
  }
  .palette-container {
    box-sizing: border-box;
    width: max-content;
    min-width: 100%;
    padding: 40px 20px;
    overflow-x: auto;
    background-color: #FFF;
    color: #000;
  }
</style>
