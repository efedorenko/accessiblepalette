<script lang='ts'>
  import chroma, { Color } from 'chroma-js';
  import { baseColors } from '../stores';
  import type { BaseColor } from '../stores';
  import { nanoid } from 'nanoid';

  function getRandomColor(): string {
    let randomColor: Color = chroma.random();

    if (chroma(randomColor).get('lch.c') < 20) {
      console.log('Random color wasn’t saturated enough, let’s try again.');
      return getRandomColor();
    } else {
      console.log('Random color: ' + randomColor.toString());
      return randomColor.toString();
    }
  }

  function addColor() {
    console.log('➕ Add color');

    const newColor: BaseColor = {
      name: nanoid(8),
      color: getRandomColor(),
      isLab: false,
      hueCorrection: 0
    };

    baseColors.update((oldStore: BaseColor[]): BaseColor[] => [newColor, ...oldStore]);
  }
</script>

<button on:click={addColor}>Add color</button>
