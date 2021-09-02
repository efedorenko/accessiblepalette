<script>
  import { baseColors } from '../stores';

  export let bColor;

  let isLab = bColor.isLab;

  const changeLabPref = (name, isLab) => {
    console.log(`Set ${name} to ${isLab ? 'LAB' : 'RGB'}`);
    baseColors.update(oldStore => {
      let newStore = oldStore;
      let index = newStore.findIndex(bColor => bColor.name === name);
      newStore[index].isLab = isLab;
      return newStore;
    });
  };
</script>

<label>
  <input type='checkbox' bind:checked={isLab} on:change={() => changeLabPref(bColor.name, isLab)}> LAB
</label>
