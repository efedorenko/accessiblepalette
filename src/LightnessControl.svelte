<script>
	import chroma from 'chroma-js';
	import { roundTo10th, roundToWhole } from './helpers';
	import { lightnessSteps, bgColor } from './stores';
	import { APCAcontrast } from './APCAonly.98e_d12e';

	export let step, lightness;

	// TODO: make a little more consistent?
	// TODO: rename "steps" to "shades"?

	let value = lightness;

	let testColor = chroma('#808080').set('lch.l', value);
	let contrast = roundTo10th(chroma.contrast(testColor, $bgColor));
	let contrastBadge = contrast >= 4.5 ? contrast : `<s class='fail'>${contrast}</s>`;
	let wcag3contrast = roundToWhole(APCAcontrast($bgColor.replace('#', '0x'), testColor.toString().replace('#', '0x')));


	const changeLightness = (step, value) => {
		lightnessSteps.update(store => {
			store[step] = value;
			return store;
		});
	}
</script>

<th>
	L: <input type="number" size="5" bind:value={value} on:change={() => changeLightness(step, value)} min=0 max=100><br>
	WCAG 2: <span class={contrast >= 4.5 ? 'pass' : 'fail'}>{@html contrastBadge}</span><br>
	WCAG 3: {@html wcag3contrast}
</th>

<style>
	input {
		width: 4em;
	}
	.pass {
		color: #5D8214;
	}
	.fail {
		color: #D14642;
	}
</style>