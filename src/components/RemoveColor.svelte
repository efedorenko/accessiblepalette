<script lang='ts'>
  import { baseColors } from '../stores';
  import type { BaseColor } from '../stores';

  export let bColor, style;

  function removeColor() {
    console.log(`➖ Remove color ${bColor.name}`);
    if (confirm(`You really want to remove color ${bColor.color.toUpperCase()}?`)) {
      baseColors.update((oldStore: BaseColor[]): BaseColor[] => {
        let newStore = oldStore;
        let index = newStore.findIndex(el => el.name === bColor.name);

        if (index !== -1) {
          newStore.splice(index, 1);
        } else {
          throw 'Color not found.';
        }

        return newStore;
      });
    }
  }
</script>

<button on:click={removeColor} style={style} title='Remove color'>Remove color</button>

<style>
  button {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0;
    border: 0;
    padding: 0;
    background: url(../assets/btn-remove.svg) no-repeat 50% 50%;
    text-indent: -999em;
    overflow: hidden;
    appearance: none;
    cursor: pointer;
  }
</style>
