import chroma from 'chroma-js';

export function generatePalette(baseColors, steps) {
	const p = [];

	function getColorFromScale(scale, lightness) {
		const color = scale(lightness / 100);
		return chroma(color);
	}

	function applyHueCorrection(chromaColor, hueCorrection, index) {
		const lightnessStepsTotal = Object.keys(steps).length;
		const hueAdjustment = (hueCorrection / lightnessStepsTotal) * (index + 1);
		return chromaColor.set('lch.h', chromaColor.lch()[2] + hueAdjustment);
	}

	baseColors.forEach(function(bColor) {
		const scale = chroma.scale(['black', bColor.color, 'white']).mode(bColor.isLab ? 'lab' : 'rgb').correctLightness();

		Object.keys(steps).forEach((step, lightnessIndex) => {
			const lightness = steps[step];
			const chromaColorWithLightness = getColorFromScale(scale, lightness);
			const chromaColorWithCorrectedHue = applyHueCorrection(chromaColorWithLightness, bColor.hueCorrection, lightnessIndex);
			const colorHex = chromaColorWithCorrectedHue.hex();

			p.push({
				color: colorHex,
				step: step,
				name: bColor.name
			});
		});
	});

	return p;
}