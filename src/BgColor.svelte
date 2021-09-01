<script>
	/*
		white and black should be presented on lightness scale.
		every level should be selectable and then all contrast ratios should be recalculated from it.
	*/

	import { bgColor } from './stores';
	import chroma from 'chroma-js';

	let color;
  bgColor.subscribe(store => color = store);

	let isError = false;

  const changeBgColor = (event) => {
    const value = event.target.value;

    if (chroma.valid(value)) {
      isError = false;
      bgColor.update(store => value);
    } else {
      isError = true;
    }
  }
</script>

<label style='padding: 1em; background-color: {color}'>
	Background color: <input type='text' size='7' value={color} class={isError ? 'error' : ''} on:change={changeBgColor}>
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
