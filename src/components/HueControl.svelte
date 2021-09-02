<script>
  import { baseColors } from '../stores';

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
        throw 'Color not found.'
      }

      return newStore;
    });
  };
</script>

<div class='hue-ctrl'>
  <input type='number'
         size='5'
         value={hueCorrection}
         on:change={changeHueCorrection}
         min='-180'
         max='180'>
</div>

<style>
  .hue-ctrl {
    padding: 1em .5em 0;
    text-align: center;
  }
  input[type="number"] {
    width: 4em;
    font: .75em Inter, sans-serif;
  }
</style>
