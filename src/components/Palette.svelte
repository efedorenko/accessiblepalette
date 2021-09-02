<script lang='ts'>
  import type { BaseColor } from '../stores';
  import { baseColors, lightnessSteps } from '../stores';
  import LightnessControl from './LightnessControl.svelte';
  import ColorCell from './ColorCell.svelte';
  import HueControl from './HueControl.svelte';
  import { generatePalette } from '../generatePalette';
  import GroupTitle from './GroupTitle.svelte';
  import GroupTitleVertical from './GroupTitleVertical.svelte';
  import AddColor from './AddColor.svelte';
  import { sortBaseColors } from '../helpers';
  import BaseColorControls from './BaseColorControls.svelte';

  import { quintInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  const transitionParams = {
    duration: 400,
    easing: quintInOut
  };

  /* Lightness
  ---------------------------------------- */

  let shades;
  lightnessSteps.subscribe(store => shades = store);


  /* Base Colors
  ---------------------------------------- */

  let colors: BaseColor[];
  let numOfColors: number;

  baseColors.subscribe((store: BaseColor[]): void => {
    colors = store.sort(sortBaseColors);
    numOfColors = store.length;

    console.log('Base colors were updated:');
    console.log(store);
  });

  /* Palette
  ---------------------------------------- */

  $: palette = generatePalette(colors, shades);
  // $: console.log('New palette:');
  // $: console.log(palette);
  const getPaletteColor = (name, step) => palette.filter(c => c.name === name).filter(c => c.step === step)[0];

</script>


<div class='palette' style='--num-of-colors: {numOfColors}; --num-of-shades: {Object.keys(shades).length}'>

  <!-- Base Colors -->

  <div class='base-colors-title'>
    <GroupTitle title='Set starting colors:' />
  </div>

  {#each colors as bColor, index (bColor.name)}
    <div
      class='palette_head'
      style={index === 0 ? 'grid-column-start: 3' : ''}
      in:fade={transitionParams}
    >
      <BaseColorControls bColor={bColor} />
    </div>
  {/each}

  <div class='add-color-cell'>
    <AddColor />
  </div>


  <!-- Colors -->

  <GroupTitleVertical title='Lightness & Contrast' />

  <div class='palette_shades'>
    {#each Object.keys(shades) as step}
      <LightnessControl step={step} />
    {/each}
  </div>

  {#each colors as bColor, index (bColor.name)}
    <div
      class='palette_colors'
      in:fade={transitionParams}
    >
      {#each Object.keys(shades) as step}
        <ColorCell color={getPaletteColor(bColor.name, step)} shade={step} />
      {/each}
    </div>
  {/each}


  <!-- Hue Correction -->

  {#each colors as bColor, index (bColor.name)}
    <div class='palette_hue'
         style={index === 0 ? 'grid-column-start: 3' : ''}
         in:fade={transitionParams}
    >
      <HueControl bColor={bColor} />
    </div>
  {/each}

  <div class='hue-ctrl-title'>
    <GroupTitle title='Adjust Hue in a color range' />
  </div>

</div>

<style>
  .palette {
    display: grid;
    grid-template-columns: auto repeat(calc(1 + var(--num-of-colors)), 1fr) auto;
    grid-auto-rows: auto;
    margin: 20px;
    color: var(--c-meta);
  }

  .base-colors-title {
    grid-column-start: 3;
    grid-column-end: span var(--num-of-colors);
  }

  .add-color-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 10px 10px;
    border: 1px solid var(--c-rulers);
    border-radius: 3px;
    padding: 20px;
  }

  .palette_shades,
  .palette_colors {
    display: grid;
    grid-template-rows: repeat(var(--num-of-shades), 1fr);
  }

  .palette_colors {
  }

  .palette_hue {

  }
  .hue-ctrl-title {
    grid-column-start: 3;
    grid-column-end: span var(--num-of-colors);
  }


</style>
