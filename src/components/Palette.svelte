<script lang='ts'>
  import { nanoid } from 'nanoid';
  import chroma, { Color } from 'chroma-js';
  import { lightnessSteps, baseColors } from '../stores';
  import type { BaseColor } from '../stores';
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

  function sortBaseColors (a: BaseColor, b: BaseColor): number {
    const chromaLimit = 15;
    const chromaA: Color = chroma(a.color);
    const chromaB: Color = chroma(b.color);

    if (chromaA.toString() === chromaB.toString()) {
      // console.log(`${chromaA} and ${chromaB} are the same`);
      return 0;
    } else if (isNaN(chromaA.get('lch.h')) || chromaA.get('lch.c') < chromaLimit) {
      // console.log(`${chromaA} is grey or desaturated, sort it to the end of the list`)
      return 1;
    } else if (isNaN(chromaB.get('lch.h')) || chromaB.get('lch.c') < chromaLimit) {
      // console.log(`${chromaB} is grey or desaturated, sort it to the end of the list`)
      return -1;
    } else if (chromaA.get('lch.h') < chromaB.get('lch.h')) {
      // console.log(`${chromaA}’s hue is less than ${chromaB}’s, sort it up front`)
      return -1;
    } else {
      // console.log(`${chromaB}’s hue is less than ${chromaA}’s, sort it up front`)
      return 1;
    }
  }

	let colors: BaseColor[];
	let numOfColors: number;

  baseColors.subscribe((store: BaseColor[]): void => {
    colors = store.sort(sortBaseColors);
    numOfColors = store.length;

	  console.log('Base colors were updated:')
    console.log(store);
	});

  // Adjust Hue

	const changeHueCorrection = (name, value) => {
		// console.log(`Change Hue correction for ${name} to ${value}.`);
		let index = colors.findIndex(bColor => bColor.name === name);
		colors[index].hueCorrection = value;
	};

  // Add color

  function addColor() {
    console.log('➕ Add color');

    function getRandomColor(): string {
      let randomColor: Color = chroma.random();

      if (chroma(randomColor).get('lch.c') < 20) {
        console.log('Random color wasn’t saturated enough, let’s try again.');
        return getRandomColor();
      } else {
        console.log('Random color: ' + randomColor.toString());
        return randomColor.toString();
      }
    }

    const newColor: BaseColor = {
      name: nanoid(8),
      color: getRandomColor(),
      isLab: false,
      hueCorrection: 0
    };

    baseColors.update((oldStore: BaseColor[]): BaseColor[] => [newColor, ...oldStore]);
  }


	/* Palette
	---------------------------------------- */

	$: palette = generatePalette(colors, shades);
	// $: console.log('New palette:');
	// $: console.log(palette);
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
<!--      <BaseColorControls bColor={bColor} />-->
    </div>
  {/each}

  <div class='palette_head'><button on:click={addColor}>Add color</button></div>


  <!-- Colors -->

    <GroupTitleVertical title="Lightness & Contrast" />

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
