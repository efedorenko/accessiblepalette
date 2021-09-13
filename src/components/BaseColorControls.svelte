<script lang="ts">
  import chroma from 'chroma-js';
  import { roundToWhole } from '../helpers';
  import { baseColors } from '../stores';
  import type { BaseColor } from '../stores';
  import LabPref from './LabPref.svelte';
  import Preview from './Preview.svelte';

  export let bColor: BaseColor;

  let isHexInvalid = false;
  $: color = bColor.color;
  $: l = roundToWhole(chroma(color).get('lch.l'));
  $: c = roundToWhole(chroma(color).get('lch.c'));
  $: h = roundToWhole(chroma(color).get('lch.h') || 0);

  const updateBaseColor = (newColor: string): void => {
    baseColors.update((oldStore: BaseColor[]): BaseColor[] => {
      let newStore = oldStore;
      let index = newStore.findIndex((el) => el.name === bColor.name);
      newStore[index].color = newColor;
      return newStore;
    });
  };

  function setHex(event: Event): void {
    const hex: string = (event.target as HTMLInputElement).value;
    if (chroma.valid(hex)) {
      isHexInvalid = false;
      updateBaseColor(hex);
    } else {
      isHexInvalid = true;
    }
  }

  function setLightness(event: Event): void {
    const lightness: number = parseFloat((event.target as HTMLInputElement).value);
    if (lightness < 0 || lightness > 100) {
      alert('Lightness is out of range (0-100).');
      return;
    }
    updateBaseColor(chroma(color).set('lch.l', lightness).toString());
  }

  function setChroma(event: Event): void {
    const chromatic: number = parseFloat((event.target as HTMLInputElement).value);
    if (chromatic < 0 || chromatic > 150) {
      alert('Chroma is out of range (0-150).');
      return;
    }
    updateBaseColor(chroma(color).set('lch.c', chromatic).toString());
  }

  function setHue(event: Event): void {
    const hue: number = parseFloat((event.target as HTMLInputElement).value);
    if (hue < 0 || hue > 360) {
      alert('Hue is out of range (0-360).');
      return;
    }
    updateBaseColor(chroma(color).set('lch.h', hue).toString());
  }
</script>

<div class="base-color-ctrl">
  <div class="hex-input">
    <Preview {color} style="margin-right: .5em;" />
    <input type="text" size="7" value={color.toUpperCase()} class={isHexInvalid ? 'error' : ''} on:change={setHex} />
  </div>

  <div class="level-input">
    <label for="l-{bColor.name}" title="Lightness">L:</label>
    <input type="number" id="l-{bColor.name}" size="5" value={l} on:change={setLightness} min={0} max={100} />
  </div>
  <div class="level-input">
    <label for="c-{bColor.name}" title="Chroma">C:</label>
    <input type="number" id="c-{bColor.name}" size="5" value={c} on:change={setChroma} min={0} max={150} />
  </div>
  <div class="level-input">
    <label for="h-{bColor.name}" title="Hue">H:</label>
    <input type="number" id="h-{bColor.name}" size="5" value={h} on:change={setHue} min={0} max={360} />
  </div>

  <div class="lab-pref">
    <LabPref {bColor} />
  </div>
</div>

<style>
  .base-color-ctrl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.75rem; /* 12px */
    padding: 0.5em 1em 0.5em 0;
  }
  .hex-input {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 0.5em;
    white-space: nowrap;
  }
  .level-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: .25em;

    white-space: nowrap;
  }
  .level-input label {
    display: inline-block;
    min-width: calc(0.625rem + 0.5em); /* Match Preview */
  }

  .lab-pref {
    margin-top: 0.5em;
  }

  input[type='text'] {
    width: 4.75em;
  }
  input[type='number'] {
    width: 4em;
  }

  input.error {
    background-color: var(--c-red-100);
  }
</style>
