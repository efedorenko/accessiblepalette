<script lang="ts">
  import Palette from '../components/Palette.svelte';
  import Description from '../components/Description.svelte';
  import { onMount } from 'svelte';
  import { baseColors, baseColorsEncodedURL } from '../stores';
  import type { BaseColor } from '../stores';

  function saveStateToURL(params) {
    console.log('saveStateToURL');
    window.history.pushState($baseColors, '',  '?' + params);
  }

  function decodeColorsFromURL(): BaseColor[] {
    const params = new URLSearchParams(window.location.search.substring(1));
    const newBaseColors = [];
    params.forEach((shorthand, color) => {
      const values   = shorthand.split(',');
      newBaseColors.push({
        name: color,
        color: values[0],
        isLab: values[1] == '1',
        hueCorrection: parseInt(values[2], 10)
      });
    });
    return newBaseColors;
  }

  onMount(() => {
    console.log('Page is mounted.')

    // Whenever state is changed, save it to the URL — except for the first load
    let isFirstLoad = true;
    baseColorsEncodedURL.subscribe((store) => {
      console.log('baseColorsEncodedURL was refreshed.');
      if (!isFirstLoad) { saveStateToURL(store); }
      isFirstLoad = false;
    });

    if (window.location.search !== '') {
      console.log('There are URL params to parse');

      // TODO: check if they're valid colors

      // TODO: add support for lightness

      // Replace baseColors with parsed colors.
      const urlBaseColors = decodeColorsFromURL();
      baseColors.set(urlBaseColors);

    } else {
      console.log('No params. Load default state.');
    }

    window.addEventListener('popstate', (event) => {
      // TODO: Reload state from event.state when navigating back/forth
      console.log('popstate event');
    });
  });
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
