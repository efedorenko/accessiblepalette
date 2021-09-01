<script>
	import chroma from 'chroma-js';
	import { roundTo10th } from './helpers';

	export let color;

	// let lightness = roundTo100th(color.lch()[0]);
	let c = roundTo10th(chroma(color.color).lch()[1]);
	let h = roundTo10th(chroma(color.color).lch()[2]);

</script>

<div style='background-color: {color.color};'
		class={parseInt(color.step, 10) >= 600 ? 'light' : 'dark'}
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
	.light {
		color: rgba(255, 255, 255, .4);
	}
	.dark {
		color: rgba(0, 0, 0, .4);
	}
</style>
