<script lang="ts">
  import { baseColors } from '../stores';
  import type { BaseColor } from '../stores';

  export let bColor: BaseColor;

  let isLab = bColor.isLab;

  const changeLabPref = () => {
    baseColors.update((oldStore) => {
      let newStore = oldStore;
      let index = newStore.findIndex((el) => el.name === bColor.name);
      newStore[index].isLab = isLab;
      return newStore;
    });
  };
</script>

<label>
  <input type="checkbox" bind:checked={isLab} on:change={changeLabPref} /> Lab
</label>
