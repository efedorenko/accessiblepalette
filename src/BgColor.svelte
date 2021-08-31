<script>
	/*
		white and black should be presented on lightness scale.
		every level should be selectable and then all contrast ratios should be recalculated from it.
	*/

	import { bgColor } from './stores';
	import chroma from 'chroma-js';

	let value = $bgColor;
	let isError = false;

	$: if (chroma.valid(value)) {
		isError = false;
		bgColor.update(store => value);
		console.log('bgColor was updated in store')
	} else {
		isError = true;
	}

</script>

<label style='padding: 1em; background-color: {value}'>
	Background color: <input type='text' size='7' bind:value={value} class={isError ? 'error' : ''}>
</label>

<style>
	input[type="text"],
	input[type="number"] {
			width: 5em;
	}
	input.error {
			background-color: #FFE7D6;
	}
</style>
