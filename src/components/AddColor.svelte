<script lang="ts">
  import chroma from 'chroma-js';
  import type { Color } from 'chroma-js';
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

<button on:click={addColor} title="Add color">
  <span class="icon">Add color</span>
</button>

<style>
  button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 100%;
    margin: 0;
    border: 1px solid var(--c-slate-100);
    border-radius: 3px;
    padding: 0.75rem;
    background: transparent none;
    appearance: none;
    cursor: pointer;
  }
  button:hover {
    border-color: var(--c-slate-200);
  }
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../assets/btn-add.svg) no-repeat;
    text-indent: -999em;
    overflow: hidden;
  }
</style>
