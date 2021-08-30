import chroma from 'chroma-js';

export function generatePalette(baseColors, lightnessSteps) {
	let p = [];

	function getColorFromScale(bColor, lightness) {
		const color = bColor.scale(lightness / 100);
		return chroma(color);
	}

	function applyHueCorrection(chromaColor, hueCorrection, index) {
		const lightnessStepsTotal = Object.keys(lightnessSteps).length;
		const hueAdjustment = (hueCorrection / lightnessStepsTotal) * (index + 1);
		return chromaColor.set('lch.h', chromaColor.lch()[2] + hueAdjustment);
	}

	baseColors.forEach(function(bColor) {
		Object.keys(lightnessSteps).forEach((step, lightnessIndex) => {
			let lightness = lightnessSteps[step];
			let chromaColorWithLightness = getColorFromScale(bColor, lightness);
			let chromaColorWithCorrectedHue = applyHueCorrection(chromaColorWithLightness, bColor.hueCorrection, lightnessIndex);
			let colorHex = chromaColorWithCorrectedHue.hex();

			p.push({
				color: colorHex,
				step: step,
				name: bColor.name
			});
		});
	});

	return p;
}