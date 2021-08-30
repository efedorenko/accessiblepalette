<script>
	import chroma from 'chroma-js';

	import BaseColorControls from './BaseColorControls.svelte';
	import LightnessControl from './LightnessControl.svelte';
	import ColorCell from './ColorCell.svelte';
	import HueControl from './HueControl.svelte';
	import { generatePalette } from './generatePalette';


	/* Lightness
	---------------------------------------- */

	// TODO: make a little more consistent?
	// TODO: rename "steps" to "shades"?
	$: lightnessSteps = {
		50: 98,
		100: 93.3,
		200: 88.6,
		300: 79.9,
		400: 71.2,
		500: 60.5,
		600: 49.8,
		700: 38.4,
		800: 27.0,
		900: 15.6
	};
	const changeLightness = (step, value) => {
		console.log(`Change Lightness for ${step} from ${lightnessSteps[step]} to ${value}.`)
		return lightnessSteps[step] = value;
	}


	/* Base Colors
	---------------------------------------- */

	let baseColors = [
		{
			name: 'red',
			color: '#e94c49',
			isLab: true,
			hueCorrection: 0
		},
		{
			name: 'orange',
			color: '#F1903C',
			isLab: true,
			hueCorrection: -10
		},
		{
			name: 'yellow',
			color: '#f3e203',
			isLab: true,
			hueCorrection: -15
		},
		{
			name: 'lime',
			color: '#89BF1D',
			isLab: false,
			hueCorrection: 0
		},
		{
			name: 'mint',
			color: '#64c273',
			isLab: false,
			hueCorrection: 15
		},
		{
			name: 'blue',
			color: '#007DCC',
			isLab: false,
			hueCorrection: 0
		},
		{
			name: 'slate',
			color: '#768092',
			isLab: false,
			hueCorrection: 0
		},
		{
			name: 'beige',
			color: '#EAE8DE',
			isLab: false,
			hueCorrection: 0
		},
		{
			name: 'grey',
			color: '#808080',
			isLab: false,
			hueCorrection: 0
		}
	];

	// Add scales to base colors
	baseColors = baseColors.map(bColor => {
		bColor.scale = chroma.scale(['black', bColor.color, 'white']).mode(bColor.isLab ? 'lab' : 'rgb').correctLightness();
		return bColor;
	});

	const changeHueCorrection = (name, value) => {
		console.log(`Change Hue correction for ${name} to ${value}.`)
		let index = baseColors.findIndex(bColor => bColor.name === name);
		baseColors[index].hueCorrection = value;
	}

	/* Palette
	---------------------------------------- */

	$: palette = generatePalette(baseColors, lightnessSteps);
	const getPaletteColor = (name, step) => palette.filter(c => c.name === name).filter(c => c.step === step)[0];
</script>


<table>
	<thead>
		<tr>
			<th></th>
			{#each baseColors as bColor}
				<BaseColorControls bColor={bColor} />
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each Object.keys(lightnessSteps) as step, lightnessIndex}
			<tr>
				<LightnessControl step={step} lightness={lightnessSteps[step]} changeLightness={changeLightness} />

				{#each baseColors as bColor}

					<ColorCell color={getPaletteColor(bColor.name, step)} />
				{/each}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<th></th>
		{#each baseColors as bColor}
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