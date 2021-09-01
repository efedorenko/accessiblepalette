import { writable } from 'svelte/store';

export const bgColor = writable('#FFFFFF');

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
		color: '#e94c49',
		isLab: true,
		hueCorrection: 0
	},
	{
		name: 'orange',
		color: '#F1903C',
		isLab: true,
		hueCorrection: -10
	},
	// {
	// 	name: 'yellow',
	// 	color: '#f3e203',
	// 	isLab: true,
	// 	hueCorrection: -15
	// },
	{
		name: 'lime',
		color: '#89BF1D',
		isLab: false,
		hueCorrection: 0
	},
	{
		name: 'mint',
		color: '#64c273',
		isLab: false,
		hueCorrection: 15
	},
	{
		name: 'blue',
		color: '#007DCC',
		isLab: false,
		hueCorrection: 0
	},
	{
		name: 'slate',
		color: '#768092',
		isLab: false,
		hueCorrection: 0
	},
	{
		name: 'beige',
		color: '#EAE8DE',
		isLab: false,
		hueCorrection: 0
	},
	{
		name: 'grey',
		color: '#808080',
		isLab: false,
		hueCorrection: 0
	}
]);