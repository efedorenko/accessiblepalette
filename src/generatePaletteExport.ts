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
  const newPal = createNestedObjectFromArray(palette);
  return newPal;
}
