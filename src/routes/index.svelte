<script>
	import Palette from '../components/Palette.svelte';
</script>

<Palette />

<style>
  :global(body) {
    min-height: 100vh;
    background-color: #FFF;
    font: 1rem Inter, sans-serif;
  }
  :global(:root) {
    --c-slate-50:  #F9F9FA;
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
    --c-meta:   #6B778C;
  }
</style>
