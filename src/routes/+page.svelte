<script lang="ts">
  import '../global.css';

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
  import Rainbow from '../components/Rainbow.svelte';
  import Toolbar from '../components/Toolbar.svelte';

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

<Toolbar />

<Palette />

<Rainbow />

<Description />

<Rainbow />
