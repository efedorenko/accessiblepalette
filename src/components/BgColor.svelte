<script lang="ts">
  /*
    TODO: white and black should be presented on lightness scale.
    every level should be selectable and then all contrast ratios should be recalculated from it.
  */

  import { bgColor } from '../stores';
  import chroma from 'chroma-js';

  let color: string;
  bgColor.subscribe((store: string) => (color = store));

  let isError = false;

  function changeBgColor(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;

    if (chroma.valid(value)) {
      isError = false;
      bgColor.update(() => value);
    } else {
      isError = true;
    }
  }
</script>

<label style="padding: 1em; background-color: {color}">
  Background color: <input
    type="text"
    size="7"
    value={color}
    class={isError ? 'error' : ''}
    on:change={changeBgColor}
  />
</label>

<style>
  input[type='text'] {
    width: 5em;
  }

  input.error {
    background-color: #ffe7d6;
  }
</style>
