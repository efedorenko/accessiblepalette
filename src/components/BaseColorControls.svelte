<script lang='ts'>
  import chroma from 'chroma-js';
  import { roundTo10th, roundToWhole } from '../helpers';
  import { baseColors } from '../stores';
  import type { BaseColor } from '../stores';
  import LabPref from './LabPref.svelte';
  import Preview from './Preview.svelte';

  export let bColor: BaseColor;

  let isHexInvalid = false;
  $: color = bColor.color;
  $: l = roundToWhole(chroma(color).get('lch.l'));
  $: c = roundToWhole(chroma(color).get('lch.c'));
  $: h = roundToWhole(chroma(color).get('lch.h'));

  const updateBaseColor = (newColor: string): void => {
    baseColors.update((oldStore: BaseColor[]): BaseColor[] => {
      let newStore = oldStore;
      let index = newStore.findIndex(el => el.name === bColor.name);
      newStore[index].color = newColor;
      return newStore;
    });
  }

  function setHex (event) {
    const hex: string = event.target.value;

    if (chroma.valid(hex)) {
      isHexInvalid = false;
      updateBaseColor(hex);

    } else {
      isHexInvalid = true;
    }
  }

  function setLightness(event) {
    const lightness = event.target.value;
    if (lightness < 0 || lightness > 100) {
      alert('Lightness is out of range (0-100).');
      return;
    }
    updateBaseColor(chroma(color).set('lch.l', lightness).toString());
  }

  function setChroma(event) {
    const chromatic = event.target.value;
    if (chromatic < 0 || chromatic > 150) {
      alert('Chroma is out of range (0-150).');
      return;
    }
    updateBaseColor(chroma(color).set('lch.c', chromatic).toString());
  }

  function setHue(event) {
    const hue = event.target.value;
    if (hue < 0 || hue > 360) {
      alert('Hue is out of range (0-360).');
      return;
    }
    updateBaseColor(chroma(color).set('lch.h', hue).toString());
  }
</script>

<div class='base-color-ctrl'>
  <div class='hex-input'>
    <Preview color={color} style='margin-right: .25em;' />
    <input type='text' size='7' value={color.toUpperCase()} class={isHexInvalid ? 'error' : ''} on:change={setHex}>
  </div>

  <div class='level-input'>
    <label for='l-{bColor.name}'>L:</label>
    <input type='number' id='l-{bColor.name}' size='5' value={l} on:change={setLightness} min={0} max={100}>
  </div>
  <div class='level-input'>
    <label for='c-{bColor.name}'>C:</label>
    <input type='number' id='c-{bColor.name}' size='5' value={c} on:change={setChroma} min={0} max={150}>
  </div>
  <div class='level-input'>
    <label for='h-{bColor.name}'>H:</label>
    <input type='number' id='h-{bColor.name}' size='5' value={h} on:change={setHue} min={0} max={360}>
  </div>

  <div class='lab-pref'>
    <LabPref bColor={bColor} />
  </div>
</div>

<style>
  .base-color-ctrl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.75rem; /* 12px */
    padding: .5em 1em .5em 0;
  }
  .hex-input {
    margin-bottom: .5em;
  }
  .level-input {
  }
  .level-input label {
    display: inline-block;
    min-width: calc(0.625rem + 0.25em); /* Match Preview */
  }

  .lab-pref {
    margin-top: .5em;
  }

  input[type="text"],
  input[type="number"] {
    width: 5em;
    font: 1em Inter, sans-serif;
  }
  input[type="number"] {
    width: 4em;
  }

  input.error {
    background-color: #FFE7D6;
  }
</style>
