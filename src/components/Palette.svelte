<script lang="ts">
  import type { BaseColor, LightnessInterface } from '../stores';
  import { baseColors, lightnessShades, paletteColors } from '../stores';
  import LightnessControl from './LightnessControl.svelte';
  import ColorCell from './ColorSwatch.svelte';
  import HueControl from './HueControl.svelte';
  import type { Palette } from '../generatePalette';
  import GroupTitle from './GroupTitle.svelte';
  import GroupTitleVertical from './GroupTitleVertical.svelte';
  import AddColor from './AddColor.svelte';
  import { sortBaseColors } from '../helpers';
  import BaseColorControls from './BaseColorControls.svelte';

  import { quintInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  /* Lightness
  ---------------------------------------- */

  let shades: LightnessInterface;
  lightnessShades.subscribe((store: LightnessInterface): void => {
    shades = store;
  });

  /* Base Colors
  ---------------------------------------- */

  let colors: BaseColor[];
  let numOfColors: number;

  baseColors.subscribe((store: BaseColor[]): void => {
    colors = store.sort(sortBaseColors);
    numOfColors = store.length;
  });

  // Transition

  const transitionParams = {
    duration: 400,
    easing: quintInOut
  };

  /* Palette
  ---------------------------------------- */

  let palette: Palette[];
  paletteColors.subscribe((store: Palette[]): void => {
    palette = store;
  });

  const getPaletteColor = (name: string, shade: string): Palette =>
    palette.filter((c: Palette) => c.name === name).filter((c: Palette) => c.shade === shade)[0];
</script>

<div class="palette-container">
  <div class="palette" style="--num-of-colors: {numOfColors}; --num-of-shades: {Object.keys(shades).length}">
    <!-- Base Colors -->

    <div class="base-colors-title">
      <GroupTitle title="Set starting colors:" />
    </div>

    {#each colors as bColor, index (bColor.name)}
      <div class="palette_head" style={index === 0 ? 'grid-column-start: 3' : ''} in:fade={transitionParams}>
        <BaseColorControls {bColor} />
      </div>
    {/each}

    <div class="add-color-cell">
      <AddColor />
    </div>

    <!-- Colors -->

    <GroupTitleVertical title="Lightness & WCAG Contrast" />

    <div class="palette_shades">
      {#each Object.keys(shades) as shade (shade)}
        <LightnessControl {shade} />
      {/each}
    </div>

    {#each colors as bColor (bColor.name)}
      <div class="palette_colors" in:fade={transitionParams}>
        {#each Object.keys(shades) as shade}
          <ColorCell color={getPaletteColor(bColor.name, shade)} {shade} />
        {/each}
      </div>
    {/each}

    <!-- Hue Correction -->

    {#each colors as bColor, index (bColor.name)}
      <div class="palette_hue" style={index === 0 ? 'grid-column-start: 3' : ''} in:fade={transitionParams}>
        <HueControl {bColor} />
      </div>
    {/each}

    <div class="hue-ctrl-title">
      <GroupTitle title="Shift color range Hue" />
    </div>
  </div>
</div>

<style>
  .palette-container {
    box-sizing: border-box;
    min-width: 100vw;
    padding: 40px 20px;
    overflow-x: auto;
    background-color: var(--c-bg);
    color: var(--c-slate-600);
  }

  .palette {
    display: grid;
    /* Lightness & Contrast title | LighrnessControl | BaseControl | AddButton */
    grid-template-columns: auto auto repeat(var(--num-of-colors), 1fr) auto;
    grid-auto-rows: auto;
  }

  .base-colors-title {
    grid-column-start: 3;
    grid-column-end: span var(--num-of-colors);
  }

  .add-color-cell {
    padding: 0.5em;
    font-size: 0.75rem;
  }

  .palette_shades,
  .palette_colors {
    display: grid;
    grid-template-rows: repeat(var(--num-of-shades), 1fr);
  }

  .hue-ctrl-title {
    grid-column-start: 3;
    grid-column-end: span var(--num-of-colors);
  }
</style>
