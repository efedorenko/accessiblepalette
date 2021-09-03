import { get, readable, writable } from 'svelte/store';

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

const _lightnessSteps: LightnessInterface = {
  50: 98,
  100: 93.3,
  200: 88.6,
  300: 79.9,
  400: 71.2,
  500: 60.5,
  600: 49.8,
  700: 38.4,
  800: 27.0,
  900: 15.6
};
export const lightnessSteps = writable(_lightnessSteps);

/* Base Colors
---------------------------------------- */

// TODO: remove pre-defined names

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
    isLab: true,
    hueCorrection: 0
  },
  {
    name: 'orange',
    color: '#f59432',
    isLab: true,
    hueCorrection: -10
  },
  {
    name: 'yellow',
    color: '#e3d90b',
    isLab: true,
    hueCorrection: -15
  },
  {
    name: 'green',
    color: '#44c74c',
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
