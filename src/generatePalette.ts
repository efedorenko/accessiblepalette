import chroma from 'chroma-js';
import type { BaseColor, LightnessInterface } from './stores';

export interface Palette {
  color: string;
  step: string;
  name: string;
}

export function generatePalette(baseColors: BaseColor[], steps: LightnessInterface): Palette[] {
	const p = [];

	function getColorFromScale(scale, lightness): chroma.Color {
		const color = scale(lightness / 100);
		return chroma(color);
	}

	function applyHueCorrection(chromaColor: chroma.Color, hueCorrection: number, index: number): chroma.Color {
		const lightnessStepsTotal = Object.keys(steps).length;
		const hueAdjustment = (hueCorrection / lightnessStepsTotal) * (index + 1);
		return chromaColor.set('lch.h', chromaColor.lch()[2] + hueAdjustment);
	}

	baseColors.forEach(function(bColor) {
		const scale = chroma.scale(['black', bColor.color, 'white']).mode(bColor.isLab ? 'lab' : 'rgb').correctLightness();

		Object.keys(steps).forEach((step, lightnessIndex) => {
			const lightness: number = steps[step];
			const chromaColorWithLightness = getColorFromScale(scale, lightness);
			const chromaColorWithCorrectedHue = applyHueCorrection(chromaColorWithLightness, bColor.hueCorrection, lightnessIndex);
			const colorHex: string = chromaColorWithCorrectedHue.hex();

      const paletteColor: Palette = {
        color: colorHex,
        step: step,
        name: bColor.name
      };

			p.push(paletteColor);
		});
	});

	return p;
}
