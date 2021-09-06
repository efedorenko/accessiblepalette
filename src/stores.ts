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

export const defaultLightness: LightnessInterface = {
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
