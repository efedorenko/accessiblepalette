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
        saveStateToURL(state)
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
