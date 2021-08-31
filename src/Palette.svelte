<script>
	import chroma from 'chroma-js';

	import { lightnessSteps, baseColors } from './stores';
	import BaseColorControls from './BaseColorControls.svelte';
	import LightnessControl from './LightnessControl.svelte';
	import ColorCell from './ColorCell.svelte';
	import HueControl from './HueControl.svelte';
	import { generatePalette } from './generatePalette';

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
		console.log(`Change Hue correction for ${name} to ${value}.`)
		let index = colors.findIndex(bColor => bColor.name === name);
		colors[index].hueCorrection = value;
	}


	/* Palette
	---------------------------------------- */

	$: palette = generatePalette(colors, steps);
	$: console.log('New palette:');
	$: console.log(palette);
	const getPaletteColor = (name, step) => palette.filter(c => c.name === name).filter(c => c.step === step)[0];
</script>


<table>
	<thead>
		<tr>
			<th><!-- Lightness --></th>
			{#each colors as bColor}
				<BaseColorControls bColor={bColor} />
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each Object.keys(steps) as step, lightnessIndex}
			<tr>
				<LightnessControl step={step} lightness={steps[step]} />

				{#each colors as bColor}
					<ColorCell color={getPaletteColor(bColor.name, step)} />
				{/each}
			</tr>
		{/each}
	</tbody>

	<tfoot>
	<th><!-- Lightness --></th>
		{#each colors as bColor}
			<HueControl bColor={bColor} changeHueCorrection={changeHueCorrection} />
		{/each}
	</tfoot>
</table>

<style>
		table {
			margin: 0 0 1em;
			border-collapse: collapse;
			font-size: 10px;
			color: rgba(0, 0, 0, .35);
    }
    :global(th),
    :global(td) {
			width: 90px;
			height: 80px;
			padding: 10px;
			font-weight: normal;
			text-align: left;
    }
</style>