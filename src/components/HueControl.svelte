<script>
  import { baseColors } from '../stores';
  import RemoveColor from './RemoveColor.svelte';

  export let bColor;

  let { hueCorrection } = bColor;

  const changeHueCorrection = (event) => {
    const value = event.target.value;

    baseColors.update(oldStore => {
      const newStore = oldStore;
      const bColorIndex = newStore.findIndex(el => el.name === bColor.name);
      if (bColorIndex !== -1) {
        newStore[bColorIndex].hueCorrection = value;
      } else {
        throw 'Color not found.';
      }

      return newStore;
    });
  };
</script>

<div class='remove-color'>
  <RemoveColor bColor={bColor} />
</div>
<div class='hue-ctrl'>
  <input type='number'
         size='5'
         value={hueCorrection}
         on:change={changeHueCorrection}
         min='-180'
         max='180'>
</div>

<style>
  .remove-color {
    padding: .5em;
    text-align: center;
  }
  .hue-ctrl {
    padding: .5em;
    text-align: center;
  }
  input[type="number"] {
    width: 4em;
    font: .75em Inter, sans-serif;
  }
</style>
