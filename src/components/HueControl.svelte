<script lang="ts">
  import { baseColors } from '../stores';
  import type { BaseColor } from '../stores';
  import RemoveColor from './RemoveColor.svelte';

  export let bColor: BaseColor;

  let { hueCorrection } = bColor;

  const changeHueCorrection = (event: Event) => {
    const value: number = parseFloat((event.target as HTMLInputElement).value);

    baseColors.update((oldStore: BaseColor[]): BaseColor[] => {
      const newStore: BaseColor[] = oldStore;
      const bColorIndex = newStore.findIndex((el) => el.name === bColor.name);
      if (bColorIndex !== -1) {
        newStore[bColorIndex].hueCorrection = value;
      } else {
        throw 'Color not found.';
      }

      return newStore;
    });
  };
</script>

<div class="remove-color">
  <RemoveColor {bColor} />
</div>
<div class="hue-ctrl">
  <input type="number" size="5" value={hueCorrection} on:change={changeHueCorrection} min="-180" max="180" />
</div>

<style>
  .remove-color {
    padding: 0.5em;
    text-align: center;
  }
  .hue-ctrl {
    padding: 0.5em;
    text-align: center;
  }
  input[type='number'] {
    width: 4em;
    font: 0.75em Inter, sans-serif;
  }
</style>
