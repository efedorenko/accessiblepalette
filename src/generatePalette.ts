import chroma from 'chroma-js';
import type { BaseColor, LightnessInterface } from './stores';

export interface Palette {
  color: string;
  shade: string;
  name: string;
}

export function generatePalette(baseColors: BaseColor[], shades: LightnessInterface): Palette[] {
  const p = [];

  function getColorFromScale(scale: chroma.Scale, lightness: number): chroma.Color {
    const color = scale(lightness / 100);
    return chroma(color);
  }

  function applyHueCorrection(chromaColor: chroma.Color, hueCorrection: number, index: number): chroma.Color {
    const totalShades = Object.keys(shades).length;
    const hueAdjustment = (hueCorrection / totalShades) * (index + 1);
    return chromaColor.set('lch.h', chromaColor.lch()[2] + hueAdjustment);
  }

  baseColors.forEach(function (bColor) {
    const scale: chroma.Scale = chroma
      .scale(['black', bColor.color, 'white'])
      .mode(bColor.isLab ? 'lab' : 'rgb')
      .correctLightness();

    Object.keys(shades).forEach((shade, lightnessIndex) => {
      const lightness: number = shades[shade];
      const chromaColorWithLightness = getColorFromScale(scale, lightness);
      const chromaColorWithCorrectedHue = applyHueCorrection(
        chromaColorWithLightness,
        bColor.hueCorrection,
        lightnessIndex
      );
      const colorHex: string = chromaColorWithCorrectedHue.hex();

      const paletteColor: Palette = {
        color: colorHex,
        shade: shade,
        name: bColor.name
      };

      p.push(paletteColor);
    });
  });

  return p;
}
