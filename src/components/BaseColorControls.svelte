<script>
	import chroma from 'chroma-js';
	import { roundTo10th, roundToWhole } from '../helpers';
	import { baseColors } from '../stores';
	import LabPref from './LabPref.svelte';

	export let bColor;

	let dirtyColor = bColor.color;
	let color = bColor.color;
	let isError = false;

	// Check is this is a valid color before proceeding
	$: if (chroma.valid(dirtyColor)) {
		color = dirtyColor;
		isError = false;
	} else {
		isError = true;
	}

	// Update the store if color changed
	$: if (color !== bColor.color) {
		console.log(`${bColor.name} has changed to ${color}.`);
		changeBaseColor(bColor.name, color);
	}

	const changeBaseColor = (name, value) => {
		console.log(`Change base color ${name} to ${value}.`);
		baseColors.update(oldStore => {
			let newStore = oldStore;
			let index = newStore.findIndex(bColor => bColor.name === name);
			newStore[index].color = value;
			return newStore;
		});
	};

	$: l = roundToWhole(chroma(color).get('lch.l'));
	$: c = roundToWhole(chroma(color).get('lch.c'));
	$: h = roundToWhole(chroma(color).get('lch.h'));

	function setLightness(event) {
		const value = event.target.value;
		if (l < 0 || l > 100) {
			alert('Lightness is out of range');
			return;
		}
		dirtyColor = chroma(color).set('lch.l', value);
	}

	function setChroma(event) {
		const value = event.target.value;
		if (c < 0 || c > 150) {
			alert('Chroma is out of range');
			return;
		}
		dirtyColor = chroma(color).set('lch.c', value);
	}

	function setHue(event) {
		const value = event.target.value;
		if (h < 0 || h > 360) {
			alert('Hue is out of range');
			return;
		}
		dirtyColor = chroma(color).set('lch.h', value);
	}
</script>

<div class='header'>
	{bColor.name}<br>
	<span class='preview' style='background-color: {color}'></span>
	<input type="text" size="7" bind:value={dirtyColor} class={isError ? 'error' : ''}><br>

	L: <input type="number" size="5" value={l} on:change={setLightness} min={0} max={100}><br>
	C: <input type="number" size="5" value={c} on:change={setChroma} min={0} max={150}><br>
	H: <input type="number" size="5" value={h} on:change={setHue} min={0} max={360}><br>

	<LabPref bColor={bColor} />
</div>

<style>
	.header {
    border: 1px solid green;
	}

	.preview {
    display: inline-block;
    width: 1.2em;
    height: 1.2em;
	}

	input[type="text"],
  input[type="number"] {
		width: 5em;
	}
	input.error {
			background-color: #FFE7D6;
	}
</style>
