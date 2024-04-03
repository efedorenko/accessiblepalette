<script lang="ts">
  import { baseColors, lightnessShades, paletteColors } from '../stores';
  import type { Palette } from '../generatePalette';
  import { generatePaletteExport } from '../generatePaletteExport';

  let paletteObject;
  paletteColors.subscribe((store: Palette[]): void => {
    paletteObject = generatePaletteExport(store);
  });

  function logPaletteObject() {
    // Make it readable
    let readablePaletteObject = JSON.stringify(paletteObject, null, 2);
    console.log('🎨 ', readablePaletteObject);
  }
</script>

<div class="export-row-container">
  <button on:click={logPaletteObject} title="Export Now">
    Export Now
  </button>
</div>

<style>

.export-row-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem .5rem;
  justify-content: center;
}
  button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    border: 1px solid var(--c-slate-100);
    border-radius: 3px;
    padding: 0.75rem;
    background: transparent none;
    appearance: none;
    cursor: pointer;
    width: 100%;
    max-width: 200px;
    /* Text */
    color: var(--c-fg);
    font-weight: 600;
    font-size: 0.75rem;
    text-align: center;
  }
  button:hover {
    border-color: var(--c-slate-200);
    background-color: var(--c-slate-100);
  }
</style>
