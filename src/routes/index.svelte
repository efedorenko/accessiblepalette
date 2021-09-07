<script lang="ts">
  import Palette from '../components/Palette.svelte';
  import Description from '../components/Description.svelte';
  import { onDestroy, onMount } from 'svelte';
  import {
    baseColors,
    lightnessShades,
    storeAsURL,
    defaultColors,
    defaultLightness,
    defaultStateAsURL
  } from '../stores';
  import type { BaseColor, LightnessInterface } from '../stores';
  import { nanoid } from 'nanoid';
  import chroma from 'chroma-js';
  import type { Unsubscriber } from 'svelte/store';

  function saveStateToURL(params: string): void {
    window.history.pushState([$lightnessShades, $baseColors], '', '?' + params);
  }

  function decodeStoreFromParams(params: string): [LightnessInterface, BaseColor[]] {
    const paramsObj = new URLSearchParams(params);
    let lightness: LightnessInterface = Object.assign({}, $lightnessShades);
    let colors: BaseColor[] = [];
    let failed = false;

    paramsObj.forEach((value, key) => {
      const values = value.split(',');

      if (key === 'lightness') {
        // Parse lightness
        if (values.length === Object.keys(lightness).length) {
          Object.keys(lightness).forEach((key: string, index: number) => {
            lightness[key] = parseFloat(values[index]);
          });
        } else {
          failed = true;
          console.log('Unexpected number of lightness shades in the URL.');
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

  function updateState(newLightness: LightnessInterface, newBaseColors: BaseColor[]) {
    lightnessShades.set(newLightness);
    baseColors.set(newBaseColors);
  }

  function recoverState(event: PopStateEvent) {
    const { state } = event;

    if (state && Object.keys(state).length === 0) {
      // console.log('🏁 Blank state. Nothing to restore.');
      updateState(defaultLightness, defaultColors);
    } else {
      // console.log('↔️ We have state to recover!');
      updateState(state[0], state[1]);
    }
  }

  let unsubscribeFromStoreAsURL: Unsubscriber;

  onMount(() => {
    // Whenever state is changed, save it to the URL
    unsubscribeFromStoreAsURL = storeAsURL.subscribe((state: string): void => {
      if (state === defaultStateAsURL) {
        // console.log('State set to the default.');
      } else if (state === window.location.search.substring(1)) {
        // console.log('State changed. No need to update browser history as URL params match state.');
      } else {
        // console.log('State changed. Update browser history.');
        saveStateToURL(state);
      }
    });

    // Get state from URL parameters
    if (window.location.search.substring(1) !== '' && window.location.search.substring(1) !== $storeAsURL) {
      const decodedState = decodeStoreFromParams(window.location.search.substring(1));
      if (decodedState) {
        // console.log('URL params were successfully decoded.')
        updateState(decodedState[0], decodedState[1]);
      }
    }

    window.addEventListener('popstate', recoverState, false);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      unsubscribeFromStoreAsURL();
      window.removeEventListener('popstate', recoverState, false);
    }
  });
</script>

<div class="rainbow"></div>

<div class="palette-container">
  <Palette />
</div>

<div class="rainbow"></div>

<Description />

<style>
  /* http://localhost:3000/?lightness=98,93,88,80,70,60,50,38,22,14&0088c9=0,0&647899=1,0 */

  :global(:root) {
    --c-slate-50: #F9F9FB;
    --c-slate-100: #E9EBF0;
    --c-slate-200: #D9DDE6;
    --c-slate-300: #C0C7D5;
    --c-slate-400: #A1ACC1;
    --c-slate-500: #8291AD;
    --c-slate-600: #647899;
    --c-slate-700: #4C5A72;
    --c-slate-800: #2E3542;
    --c-slate-900: #20242B;

    --c-rulers: #e8ebf0;
    --c-meta: #6b778c;
  }
  :global(body) {
    min-height: 100vh;
    margin: 0;
    padding: 0;
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
  .rainbow {
    height: 4px;
    background-image: linear-gradient(to right, #E76B4F, #B18B32, #43A447, #21A19C, #2C9ACC, #9085DE);
  }

  .palette-container {
    box-sizing: border-box;
    min-width: 100vw;
    padding: 40px 20px;
    overflow-x: auto;
    background-color: #fff;
    color: #000;
  }
</style>
