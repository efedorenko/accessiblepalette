<script>
  import { nanoid } from 'nanoid';
  import chroma from 'chroma-js'
  import { lightnessSteps, baseColors} from '../stores';
	import BaseColorControls from './BaseColorControls.svelte';
	import LightnessControl from './LightnessControl.svelte';
	import ColorCell from './ColorCell.svelte';
	import HueControl from './HueControl.svelte';
	import { generatePalette } from '../generatePalette';
	import GroupTitle from './GroupTitle.svelte';
  import GroupTitleVertical from './GroupTitleVertical.svelte';

	/* Lightness
	---------------------------------------- */

	let shades;
	lightnessSteps.subscribe(store => shades = store);


	/* Base Colors
	---------------------------------------- */

	let colors;
	let numOfColors = $baseColors.length;
	baseColors.subscribe(store => {
	  colors = store.sort((a, b) => {
	    const chromaLimit = 15;
	    a = chroma(a.color);
      b = chroma(b.color);

      if (isNaN(a.get('lch.h')) || a.get('lch.c') < chromaLimit) {
        return 1;
      } else if (isNaN(b.get('lch.h')) || b.get('lch.c') < chromaLimit) {
        return -1;
      } else {
        return (a.get('lch.h') > b.get('lch.h')) ? 1 : -1;
      }
    });
    numOfColors = colors.length;
	});

  // Adjust Hue

	const changeHueCorrection = (name, value) => {
		console.log(`Change Hue correction for ${name} to ${value}.`);
		let index = colors.findIndex(bColor => bColor.name === name);
		colors[index].hueCorrection = value;
	};

  // Add color

  function addColor() {
    baseColors.update(oldStore => {
      let newStore = oldStore;
      newStore.push(	{
        name: nanoid(10),
        color: chroma.random(),
        isLab: false,
        hueCorrection: 0
      });
      return newStore;
    });
  }


	/* Palette
	---------------------------------------- */

	$: console.log('New palette:');
	$: console.log(palette);
	$: palette = generatePalette(colors, shades);
	const getPaletteColor = (name, step) => palette.filter(c => c.name === name).filter(c => c.step === step)[0];

</script>


<div class='palette' style='--num-of-colors: {numOfColors}; --num-of-shades: {Object.keys(shades).length}'>

  <!-- Base Colors Title -->

  <div class='base-colors-title'>
    <GroupTitle title="Set starting colors:" />
  </div>


  <!-- Header -->

<!--  <div class='palette_head'>[eh]</div>-->
<!--  <div class='palette_head'>[eh]</div>-->

  {#each colors as bColor, index}
    <div class='palette_head' style={index === 0 ? 'grid-column-start: 3' : ''}>
      <BaseColorControls bColor={bColor} />
    </div>
  {/each}

  <div class='palette_head'><button on:click={addColor}>Add color</button></div>


  <!-- Colors -->

    <GroupTitleVertical title="Set starting colors:" />

    <div class='palette_shades'>
      {#each Object.keys(shades) as step}
        <LightnessControl step={step} />
      {/each}
    </div>

  {#each colors as bColor}
    <div class='palette_colors'>
      {#each Object.keys(shades) as step}
        <ColorCell color={getPaletteColor(bColor.name, step)} shade={step} />
      {/each}
    </div>
  {/each}

  <div class='palette_colors'>[empty]</div>


  <!-- Hue Correction -->

  {#each colors as bColor, index}
    <div class='palette_hue' style={index === 0 ? 'grid-column-start: 3' : ''}>
      <HueControl bColor={bColor} changeHueCorrection={changeHueCorrection} />
    </div>
  {/each}

  <div class='palette_hue'>[empty]</div>

</div>

<style>
	.palette {
		display: grid;
    grid-template-columns: auto repeat(calc(1 + var(--num-of-colors) + 1), 1fr);
    grid-auto-rows: auto;
		margin: 20px;
		color: var(--c-meta);
	}
    .base-colors-title {
      grid-column-start: 3;
      grid-column-end: span var(--num-of-colors);
    }
    .palette_head {

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

</style>
