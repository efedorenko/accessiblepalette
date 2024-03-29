import type { BaseColor } from './stores';
import type { Color } from 'chroma-js';
import chroma from 'chroma-js';
import { APCAcontrast, sRGBtoY } from 'apca-w3';
import { colorParsley } from 'colorparsley';

const roundTo = (num: number, multiplier: number): number => Math.floor(num * multiplier) / multiplier;

export const roundTo100th = (num: number): number => roundTo(num, 100);

export const roundTo10th = (num: number): number => roundTo(num, 10);

export const roundToWhole = (num: number): number => roundTo(num, 1);

export function sortBaseColors(a: BaseColor, b: BaseColor): number {
  const chromaLimit = 15;
  const chromaA: Color = chroma(a.color);
  const chromaB: Color = chroma(b.color);

  if (chromaA.toString() === chromaB.toString()) {
    // console.log(`${chromaA} and ${chromaB} are the same`);
    return 0;
  } else if (isNaN(chromaA.get('lch.h')) || chromaA.get('lch.c') < chromaLimit) {
    // console.log(`${chromaA} is grey or desaturated, sort it to the end of the list`)
    return 1;
  } else if (isNaN(chromaB.get('lch.h')) || chromaB.get('lch.c') < chromaLimit) {
    // console.log(`${chromaB} is grey or desaturated, sort it to the end of the list`)
    return -1;
  } else if (chromaA.get('lch.h') < chromaB.get('lch.h')) {
    // console.log(`${chromaA}’s hue is less than ${chromaB}’s, sort it up front`)
    return -1;
  } else {
    // console.log(`${chromaB}’s hue is less than ${chromaA}’s, sort it up front`)
    return 1;
  }
}

export const getWcag2CR = (fg: string, bg: string): number => roundTo10th(chroma.contrast(fg, bg));

export const getWcag3CR = (fg: string, bg: string): number =>
roundToWhole(APCAcontrast(sRGBtoY(colorParsley(fg)), sRGBtoY(colorParsley(bg))));

export const useProperMinus = (num: number): string => num.toString().replace('-', '\u2212');
