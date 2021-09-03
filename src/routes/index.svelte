<script>
  import Palette from '../components/Palette.svelte';
  import Description from '../components/Description.svelte';
</script>

<div class="palette-container">
  <Palette />
</div>

<Description />

<style>
  :global(:root) {
    --c-slate-50: #f9f9fa;
    --c-slate-100: #eaecef;
    --c-slate-200: #dbdfe4;
    --c-slate-300: #c1c6d1;
    --c-slate-400: #a7afbd;
    --c-slate-500: #8793a6;
    --c-slate-600: #6b778c;
    --c-slate-700: #525b6b;
    --c-slate-800: #3a404c;
    --c-slate-900: #23272e;

    --c-rulers: #e8ebf0;
    --c-meta: #6b778c;
  }
  :global(body) {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #353149;
    color: #fff;
    font: 1rem Inter, sans-serif;
  }
  :global(input[type='number'], input[type='text']) {
    margin: 0;
    border: 1px solid var(--c-slate-200);
    border-radius: 2px;
    padding: 0.2em 0.4em;
    font-family: Inter, sans-serif;
  }
  :global(input[type='number']) {
    padding-right: 0;
  }
  :global(input[type='number']:focus, input[type='text']:focus) {
    outline: none;
    box-shadow: 0 0 0 2px #dceff8;
  }
  .palette-container {
    box-sizing: border-box;
    width: max-content;
    min-width: 100%;
    padding: 40px 20px;
    overflow-x: auto;
    background-color: #fff;
    color: #000;
  }
</style>
