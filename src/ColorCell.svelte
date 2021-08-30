<script>
	export let color;


	// let lightness = roundTo100th(color.lch()[0]);
	// let chrome = roundTo100th(color.lch()[1]);
	// let hue = roundTo100th(color.lch()[2]);
	// let contrast = roundTo10th(chroma.contrast(colorHex, bgColor));
	// let contrastBadge = contrast >= 4.5 ? `✓ ${contrast}` : `<s>${contrast}</s>`;
	// let wcag3contrast = roundToWhole(APCAcontrast(bgColor.replace('#', '0x'), colorHex.replace('#', '0x')));

</script>

<td style='background-color: {color.color};' class={parseInt(color.step, 10) >= 600 ? 'light' : 'dark'}>
	{color.color.toUpperCase()}
</td>

<style>
	td {
		font-size: 10px;
		letter-spacing: 0.1em;
	}
	td.light {
		color: rgba(255, 255, 255, .225)
	}
	td.dark {
		color: rgba(0, 0, 0, .225)
	}
</style>