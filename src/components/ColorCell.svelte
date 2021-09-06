<script lang="ts">
  import chroma from 'chroma-js';
  import { bgColor, defaultBgColor, lightnessShades } from '../stores';
  import { roundTo10th } from '../helpers';
  import type { Palette } from '../generatePalette';

  export let color: Palette, shade: string;

  $: lightness = $lightnessShades[shade] as number;

  let c: number = roundTo10th(chroma(color.color).get('lch.c'));
  let h: number = roundTo10th(chroma(color.color).get('lch.h'));

  let isSelected = false;

  bgColor.subscribe((store: string) => {
    isSelected = store === color.color;
  });

  function selectColor(): void {
    if (!isSelected) {
      bgColor.set(color.color);
    } else {
      bgColor.set($defaultBgColor);
    }
  }
</script>

<div
  style="background-color: {color.color};"
  on:click={selectColor}
  class={[
    isSelected ? 'selected' : '',
    lightness >= 60 ? 'dark' : 'light'
  ].join(' ')}
  data-shade={shade}
  title="Chroma: {c}, Hue: {h}"
>
  {color.color.toUpperCase()}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5em 0.25em;
    font: 0.75rem 'iA Writer Duo', monospace, sans-serif;
    letter-spacing: 0.1em;
    text-align: center;
    cursor: pointer;
  }
  .light {
    color: rgba(255, 255, 255, .66);
  }
  .dark {
    color: rgba(0, 0, 0, .66);
  }
  .selected {
    box-shadow: inset 0 0 0 3px rgba(255, 255, 255, .75);
  }
</style>
