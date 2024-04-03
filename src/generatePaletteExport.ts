import chroma from 'chroma-js';
import type { BaseColor, LightnessInterface } from './stores';
import type { Palette } from './generatePalette';

function createNestedObjectFromArray(array) {
  const nestedObject = {};

  array.forEach((item) => {
    const { name, shade, color } = item;
    if (!nestedObject[name]) {
      nestedObject[name] = {};
    }
    nestedObject[name][shade] = color;
  });

  return nestedObject;
}

export function generatePaletteExport(palette: Palette[]): any {
  console.log('🚀 generatePaletteExport');
  console.log('palette', palette);

  const newPal = createNestedObjectFromArray(palette);
  console.log('newPal', newPal);
  return newPal;
}
