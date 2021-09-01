<script>
  import { nanoid } from 'nanoid';
  import chroma from 'chroma-js'
  import {dndzone, overrideItemIdKeyNameBeforeInitialisingDndZones} from 'svelte-dnd-action';
	import { lightnessSteps, baseColors } from './stores';
	import BaseColorControls from './BaseColorControls.svelte';
	import LightnessControl from './LightnessControl.svelte';
	import ColorCell from './ColorCell.svelte';
	import HueControl from './HueControl.svelte';
	import { generatePalette } from './generatePalette';
	import BgColor from './BgColor.svelte';


	/* Lightness
	---------------------------------------- */

	let steps;
	lightnessSteps.subscribe(store => steps = store);


	/* Base Colors
	---------------------------------------- */

	let colors;
	baseColors.subscribe(store => colors = store);

	$: console.log('Base color was updated!');
	$: console.log(colors);

	const changeHueCorrection = (name, value) => {
		console.log(`Change Hue correction for ${name} to ${value}.`);
		let index = colors.findIndex(bColor => bColor.name === name);
		colors[index].hueCorrection = value;
	};


	/* Palette
	---------------------------------------- */

	$: palette = generatePalette(colors, steps);
	$: console.log('New palette:');
	$: console.log(palette);
	const getPaletteColor = (name, step) => palette.filter(c => c.name === name).filter(c => c.step === step)[0];


  /* Drag-n-drop
  ---------------------------------------- */

  overrideItemIdKeyNameBeforeInitialisingDndZones("name");

  function handleSort(e) {
    baseColors.update(store => e.detail.items);
  }


  /* Add color
  ---------------------------------------- */

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

</script>


<div class='palette'>
	<div class='palette_col'>
		{#each Object.keys(steps) as step, lightnessIndex}
			<LightnessControl step={step} />
		{/each}
	</div>

  <section class='palette_sortable' use:dndzone={{items: colors}} on:consider={handleSort} on:finalize={handleSort}>
    {#each colors as bColor(bColor.name)}
      <div class='palette_col'>
        <BaseColorControls bColor={bColor} />

        {#each Object.keys(steps) as step, lightnessIndex}
          <ColorCell color={getPaletteColor(bColor.name, step)} />
        {/each}

        <HueControl bColor={bColor} changeHueCorrection={changeHueCorrection} />
      </div>
    {/each}
  </section>

  <div class='palette_col'>
    <div>
      <button on:click={addColor}>Add color</button>
    </div>
  </div>
</div>

<BgColor />

<style>
	.palette {
		display: grid;
		grid-auto-columns: auto;
		grid-auto-flow: column;
		margin: 0 0 10px;
		font-size: 10px;
		color: rgba(0, 0, 0, .35);
	}
  .palette_sortable {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
  }
	.palette_col {
		display: grid;
		grid-auto-flow: row;
		width: 100px;
		text-align: left;
	}
</style>
