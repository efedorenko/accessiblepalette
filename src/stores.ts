import { derived, get, readable, writable } from 'svelte/store';
import { generatePalette } from './generatePalette';
import type { Palette } from './generatePalette';
import { getWcag2CR, getWcag3CR } from './helpers';

export const minContrastRatioWCAG2 = 4.5;
export const minContrastRatioWCAG3 = 60;

/* Background Color & Contrast Check
---------------------------------------- */

// Keep Hex in full 6-digit format for APCA Contrast Calculator
export const defaultBgColor = readable<string>('#FFFFFF');
export const bgColor = writable<string>(get(defaultBgColor));

/* Lightness
---------------------------------------- */

export interface LightnessInterface {
  '50': number;
  '100': number;
  '200': number;
  '300': number;
  '400': number;
  '500': number;
  '600': number;
  '700': number;
  '800': number;
  '900': number;
}

export const defaultLightness: LightnessInterface = {
  50: 98.2,
  100: 93.9,
  200: 85.1,
  300: 76.2,
  400: 67.8,
  500: 57.8,
  600: 48,
  700: 40.6,
  800: 31.8,
  900: 24.9
};
Object.freeze(defaultLightness);
export const lightnessShades = writable(Object.assign({}, defaultLightness));

/* Base Colors
---------------------------------------- */

export interface BaseColor {
  name: string;
  color: string;
  isLab: boolean;
  hueCorrection: number;
}

export const defaultColors: BaseColor[] = [
  {
    name: 'red',
    color: '#fe6f5c',
    isLab: false,
    hueCorrection: 0
  },
  {
    name: 'yellow',
    color: '#f8d147',
    isLab: false,
    hueCorrection: -10
  },
  {
    name: 'green',
    color: '#56d25b',
    isLab: false,
    hueCorrection: 0
  },
  {
    name: 'blue',
    color: '#0088cb',
    isLab: false,
    hueCorrection: 0
  },
  {
    name: 'purple',
    color: '#397ae5',
    isLab: true,
    hueCorrection: 15
  },
  {
    name: 'slate',
    color: '#69788f',
    isLab: false,
    hueCorrection: 0
  },
  {
    name: 'grey',
    color: '#808080',
    isLab: false,
    hueCorrection: 0
  }
];
const colors = defaultColors.map((color: BaseColor) => Object.assign({}, color));
export const baseColors = writable(colors);

/* Store encoded as URL
---------------------------------------- */

const encodeStoreAsURL = ([shades, colors]: [LightnessInterface, BaseColor[]]): string => {
  const encodedColors: string = colors
    .map((color: BaseColor) => {
      const hex = color.color.substring(1);
      return `${hex}=${color.isLab ? 1 : 0},${color.hueCorrection}`;
    })
    .join('&');
  const encodedShades: string = 'lightness=' + Object.values(shades).join(',');
  return encodedShades + '&' + encodedColors;
};
export const defaultStateAsURL: string = encodeStoreAsURL([defaultLightness, defaultColors]);
export const storeAsURL = derived([lightnessShades, baseColors], encodeStoreAsURL);

/* Palette
---------------------------------------- */

export const paletteColors = derived([lightnessShades, baseColors], generatePalette);

/* Lightness with CRs
---------------------------------------- */

export interface ShadeInterface {
  value: number;
  minWcag2: number;
  maxWcag2: number;
  minWcag3: number;
  maxWcag3: number;
}
export interface LightnessWithContrastsInterface {
  '50': ShadeInterface;
  '100': ShadeInterface;
  '200': ShadeInterface;
  '300': ShadeInterface;
  '400': ShadeInterface;
  '500': ShadeInterface;
  '600': ShadeInterface;
  '700': ShadeInterface;
  '800': ShadeInterface;
  '900': ShadeInterface;
}
export const lightnessWithContrasts = derived(
  [lightnessShades, paletteColors, bgColor],
  ([shades, palette, bg]): LightnessWithContrastsInterface => {
    const obj = {} as LightnessWithContrastsInterface;

    Object.keys(shades).map((shade) => {
      const colorsByShade = palette.filter((color: Palette) => color.shade === shade) as Palette[];
      const allWcag2CRs = colorsByShade.map((color: Palette) => getWcag2CR(color.color, bg));
      const allWcag3CRs = colorsByShade.map((color: Palette) => getWcag3CR(color.color, bg));

      obj[shade] = {
        value: shades[shade],
        minWcag2: Math.min(...allWcag2CRs),
        maxWcag2: Math.max(...allWcag2CRs),
        minWcag3: Math.min(...allWcag3CRs),
        maxWcag3: Math.max(...allWcag3CRs)
      } as ShadeInterface;
    });

    return obj;
  }
);
