<script lang='ts'>
  import chroma from 'chroma-js';
  import { bgColor, defaultBgColor } from '../stores';
  import { roundTo10th } from '../helpers';
  import type { Palette } from '../generatePalette';

  export let color: Palette, shade: string;

  let c: number = roundTo10th(chroma(color.color).get('lch.c'));
  let h: number = roundTo10th(chroma(color.color).get('lch.h'));

  let isSelected = false;

  bgColor.subscribe((store: string) => {
    isSelected = (store === color.color);
  });

  function selectColor(): void {
    if (!isSelected) {
      bgColor.update(() => color.color);
    } else {
      bgColor.update(() => $defaultBgColor);
    }
  }
</script>

<div style='background-color: {color.color};'
     on:click={selectColor}
     class={isSelected ? 'selected' : ''}
     data-shade={shade}
     title='Chroma: {c}, Hue: {h}'
>
  {color.color.toUpperCase()}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: .5em .25em;
    font: 0.75rem 'iA Writer Duo', monospace, sans-serif;
    letter-spacing: 0.1em;
    text-align: center;
    cursor: pointer;
  }

  /* TODO: Lightness levels can vary, so instead we should create CSS vars behind the scenes */
  /* Maintain 50 CR */
  [data-shade="50"] {
    color: #868686;
    color: rgba(0, 0, 0, 0.47);
  }

  [data-shade="100"] {
    color: #777;
    color: rgba(0, 0, 0, 0.53);
  }

  [data-shade="200"] {
    color: #646464;
    color: rgba(0, 0, 0, 0.61);
  }

  [data-shade="300"] {
    color: #444;
    color: rgba(0, 0, 0, 0.73);
  }

  [data-shade="400"] {
    color: #101010;
    color: rgba(0, 0, 0, 0.94);
  }

  [data-shade="500"] {
    color: #f9f9f9;
    color: rgba(255, 255, 255, .98);
  }

  [data-shade="600"] {
    color: #e4e4e4;
    color: rgba(255, 255, 255, .89);
  }

  [data-shade="700"] {
    color: #d2d2d2;
    color: rgba(255, 255, 255, .82);
  }

  [data-shade="800"] {
    color: #c2c2c2;
    color: rgba(255, 255, 255, .76);
  }

  [data-shade="900"] {
    color: #b6b6b6;
    color: rgba(255, 255, 255, .71);
  }

  .selected {
    box-shadow: inset 0 0 0 3px rgba(255, 255, 255, .75);
  }
</style>
