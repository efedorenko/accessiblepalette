<script lang="ts">
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

<button on:click={addColor} title="Add color">Add color</button>

<style>
  button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 1px solid var(--c-rulers);
    border-radius: 3px;
    padding: 0.75rem;
    background: url(../assets/btn-add.svg) no-repeat 50% 50% / 20px 20px;
    text-indent: -999em;
    overflow: hidden;
    appearance: none;
    cursor: pointer;
  }
  button:hover {
    border-color: #717C8F80;
  }
</style>
