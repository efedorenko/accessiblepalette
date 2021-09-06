import { get, readable, writable, derived } from 'svelte/store';

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

const shades: LightnessInterface = {
  50: 98,
  100: 93,
  200: 88,
  300: 80,
  400: 70,
  500: 60,
  600: 50,
  700: 38,
  800: 26,
  900: 14
};
export const lightnessShades = writable(shades);

/* Base Colors
---------------------------------------- */

export interface BaseColor {
  name: string;
  color: string;
  isLab: boolean;
  hueCorrection: number;
}

const _baseColors: BaseColor[] = [
  {
    name: 'red',
    color: '#fe6f5c',
    isLab: false,
    hueCorrection: 0
  },
  {
    name: 'yellow',
    color: '#f8d147',
    isLab: true,
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
    color: '#0088c9',
    isLab: false,
    hueCorrection: 0
  },
  {
    name: 'purple',
    color: '#397ae5',
    isLab: false,
    hueCorrection: 15
  },
  {
    name: 'slate',
    color: '#738097',
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
export const baseColors = writable(_baseColors);

export const baseColorsEncodedURL = derived(baseColors, ($baseColors) =>
  $baseColors.map(color => {
    const hex = color.color.substring(1);
    return `${hex}=${color.isLab ? 1 : 0},${color.hueCorrection}`;
  }).join('&')
);
