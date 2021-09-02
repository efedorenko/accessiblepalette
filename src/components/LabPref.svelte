<script>
  import { baseColors } from '../stores';

  export let bColor;

  let isLab = bColor.isLab;

  const changeLabPref = (event) => {
    baseColors.update(oldStore => {
      let newStore = oldStore;
      let index = newStore.findIndex(el => el.name === bColor.name);
      newStore[index].isLab = isLab;
      return newStore;
    });
  };
</script>

<label>
  <input type='checkbox' bind:checked={isLab} on:change={changeLabPref}> Lab
</label>
