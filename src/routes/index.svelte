<script lang="ts">
  import Palette from '../components/Palette.svelte';
  import Description from '../components/Description.svelte';
  import { onMount } from 'svelte';
  import { baseColors, lightnessShades, encodeStoreAsURL } from '../stores';
  import type { BaseColor, LightnessInterface } from '../stores';
  import { nanoid } from 'nanoid';
  import chroma, { Color } from 'chroma-js';

  function saveStateToURL(params) {
    window.history.pushState($baseColors, '',  '?' + params);
  }

  function decodeStoreFromURL(): [LightnessInterface, BaseColor[]] {
    const params = new URLSearchParams(window.location.search.substring(1));
    let lightness: LightnessInterface = Object.assign({}, $lightnessShades);
    let colors: BaseColor[] = [];
    let failed = false;

    params.forEach((value, key) => {
      const values = value.split(',');

      if (key === 'lightness') {
        // Parse lightness
        if (values.length === Object.keys(lightness).length) {
          Object.keys(lightness).forEach((key: string, index: number) => {
            lightness[key] = parseFloat(values[index]);
          });
        } else {
          failed = true;
          console.log('Unexpected number of lightness shades in the URL.')
        }
      } else {
        // Parse color
        if (chroma.valid(key)) {
          colors.push({
            name: nanoid(8),
            color: '#' + key,
            isLab: values[0] == '1',
            hueCorrection: parseInt(values[1], 10) || 0
          });
        } else {
          failed = true;
          console.log(`${key} is not a valid color`);
        }
      }
    });

    if (failed) {
      return undefined;
    } else {
      return [lightness, colors];
    }
  }

  onMount(() => {
    // Whenever state is changed, save it to the URL — except for the first load
    let isFirstLoad = true;
    encodeStoreAsURL.subscribe((store) => {
      if (!isFirstLoad) { saveStateToURL(store); }
      isFirstLoad = false;
    });

    if (window.location.search !== '') {
      // Replace base colors and lightness shades with parsed colors
      const decodedState = decodeStoreFromURL();
      if (decodedState) {
        const newLightness = decodedState[0];
        const newBaseColors = decodedState[1];
        baseColors.set(newBaseColors);
        lightnessShades.set(newLightness);
      }
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
