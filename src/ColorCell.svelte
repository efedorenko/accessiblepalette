<script>
	import chroma from 'chroma-js';
	import { roundTo10th } from './helpers';

	export let color;

	// let lightness = roundTo100th(color.lch()[0]);
	let c = roundTo10th(chroma(color.color).lch()[1]);
	let h = roundTo10th(chroma(color.color).lch()[2]);

</script>

<td style='background-color: {color.color};'
		class={parseInt(color.step, 10) >= 600 ? 'light' : 'dark'}
		title='Chroma: {c}, Hue: {h}'
>
	{color.color.toUpperCase()}
</td>

<style>
	td {
		height: 50px;
		font-size: 10px;
		letter-spacing: 0.1em;
		text-align: center;
	}
	td.light {
		color: rgba(255, 255, 255, .33)
	}
	td.dark {
		color: rgba(0, 0, 0, .33)
	}
</style>