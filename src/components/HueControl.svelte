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

<div>
  <input type='number'
         size='5'
         value={hueCorrection}
         on:change={changeHueCorrection}
         min='-180'
         max='180'>
</div>
