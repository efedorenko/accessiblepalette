import { writable, readable, get } from 'svelte/store';

export const defaultBgColor = readable('#FFF');
export const bgColor = writable(get(defaultBgColor));
export const selectedColor = writable();

export const lightnessSteps = writable({
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
});

// TODO: remove pre-defined names
export const baseColors = writable([
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
	// {
	// 	name: 'beige',
	// 	color: '#EAE8DE',
	// 	isLab: false,
	// 	hueCorrection: 0
	// },
	{
		name: 'grey',
		color: '#808080',
		isLab: false,
		hueCorrection: 0
	}
]);
