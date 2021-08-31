<script>
	import chroma from 'chroma-js';
	import { roundTo10th, roundToWhole } from './helpers';
	import { lightnessSteps, bgColor } from './stores';
	import { APCAcontrast } from './APCAonly.98e_d12e';

	export let step;

	// TODO: make a little more consistent?
	// TODO: rename "steps" to "shades"?

	let bg;
	bgColor.subscribe(store => {
		bg = store;
	});

	let lightness;
	lightnessSteps.subscribe(store => {
		lightness = store[step];
	})

	$: testColor = chroma('#808080').set('lch.l', lightness);
	$: contrast = roundTo10th(chroma.contrast(testColor, bg));
	$: contrastBadge = contrast >= 4.5 ? contrast : `<s class='fail'>${contrast}</s>`;
	$: wcag3contrast = roundToWhole(APCAcontrast(bg.replace('#', '0x'), testColor.toString().replace('#', '0x')));

	const changeLightness = (event) => {
		const value = event.target.value;

		lightnessSteps.update(store => {
			store[step] = value;
			return store;
		});
	}
</script>

<th>
	<label>
		<span class='preview' style='background-color: {testColor}'></span> {step}:
		<input type="number" size="5" value={lightness} on:change={changeLightness} min=0 max=100>
	</label><br>

	WCAG 2: <span class={contrast >= 4.5 ? 'pass' : 'fail'}>{@html contrastBadge}</span><br>
	WCAG 3: {@html wcag3contrast}
</th>

<style>
	th {
		width: 10em;
		line-height: 1.6;
	}

	.preview {
		display: inline-block;
		width: .8em;
		height: .8em;
		background-color: #EEE;
	}
	input {
		width: 4em;
	}
	.pass {
		color: #308559;
	}
	.fail {
		color: #AF6334;
	}
</style>