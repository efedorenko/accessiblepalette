<script>
	import chroma from 'chroma-js';
  import { bgColor, defaultBgColor } from '../stores';
	import { roundTo10th } from '../helpers';

	export let color;

	// let lightness = roundTo100th(color.lch()[0]);
	let c = roundTo10th(chroma(color.color).lch()[1]);
	let h = roundTo10th(chroma(color.color).lch()[2]);

	let originalBgColor = $bgColor;
  let isSelected = false;

  let currentBgColor;
  bgColor.subscribe(store => currentBgColor = store)

  $: if (currentBgColor === color.color) {
    console.log('selected color: ' + color.color)
    isSelected = true;
  } else {
    isSelected = false;
  }


  function selectColor() {
    if (!isSelected) {
      bgColor.update(store => color.color);
    } else {
      bgColor.update(store => $defaultBgColor);
    }
  }

</script>

<div style='background-color: {color.color};'
     on:click={selectColor}
		 class={
       [
         parseInt(color.step, 10) >= 600 ? 'light' : 'dark',
         isSelected ? 'selected' : ''
       ].join(' ')
     }
		 title='Chroma: {c}, Hue: {h}'
>
	{color.color.toUpperCase()}
</div>

<style>
	div {
		height: 70px;
		font-size: 10px;
		letter-spacing: 0.1em;
		text-align: center;
	}
  .selected {
    box-shadow: inset 0 0 0 3px rgba(255, 255, 255, .75);
  }
	.light {
		color: rgba(255, 255, 255, .4);
	}
	.dark {
		color: rgba(0, 0, 0, .4);
	}
</style>
