<script lang="ts">
  import chroma from 'chroma-js';
  import type { LightnessInterface, LightnessWithContrastsInterface, ShadeInterface } from '../stores';
  import {
    bgColor,
    lightnessShades,
    lightnessWithContrasts,
    minContrastRatioWCAG2,
    minContrastRatioWCAG3
  } from '../stores';
  import Preview from './Preview.svelte';
  import { useProperMinus } from '../helpers';

  export let shade: string;

  let bg: string;
  bgColor.subscribe((store: string) => {
    bg = store;
  });

  let lightness: ShadeInterface;
  lightnessWithContrasts.subscribe((store: LightnessWithContrastsInterface) => {
    lightness = store[shade];
  });

  $: noContrast = (lightness.minWcag2 === 1 && lightness.minWcag3 >= -1 && lightness.maxWcag3 <= 1) as boolean;
  $: previewColor = chroma('#808080').set('lch.l', lightness.value).toString();

  const changeLightness = (event: Event) => {
    const value: number = parseFloat((event.target as HTMLInputElement).value);

    lightnessShades.update(
      (store: LightnessInterface): LightnessInterface => {
        store[shade] = value;
        return store;
      }
    );
  };
</script>

<div class="lightness">
  <div class="shade">
    <Preview color={bg} style="margin-left: -0.875em; margin-right: .25em; box-shadow: inset 0 0 0 1px rgba(128, 128, 128, .25);" />
    <Preview color={previewColor} style="margin-right: .25em; box-shadow: inset 0 0 0 1px rgba(128, 128, 128, .25);" />
    <label for="shade-{shade}">{shade}:</label>
    <input
      type="number"
      id="shade-{shade}"
      size="5"
      value={lightness.value}
      on:change={changeLightness}
      min="0"
      max="100"
    />
  </div>

  <div class={`contrast-ratio ${noContrast ? 'zero' : ''}`}>
    WCAG 2:
    <span class={lightness.minWcag2 >= minContrastRatioWCAG2 ? 'pass' : 'fail'}>
      {#if lightness.minWcag2 === lightness.maxWcag2}
        {lightness.minWcag2}
      {:else}
        {lightness.minWcag2}..{lightness.maxWcag2}
      {/if}
    </span>
  </div>
  <div class={`contrast-ratio ${noContrast ? 'zero' : ''}`}>
    WCAG 3:
    <span class={Math.abs(lightness.minWcag3) >= minContrastRatioWCAG3 ? 'pass' : 'fail'}>
      {#if lightness.minWcag3 === lightness.maxWcag3}
        {useProperMinus(lightness.minWcag3)}
      {:else}
        {useProperMinus(lightness.minWcag3)}..{useProperMinus(lightness.maxWcag3)}
      {/if}
    </span>

    <!--    <span class={Math.abs(contrastWCAG3) >= minContrastRatioWCAG3 ? 'pass' : 'fail'}>-->
    <!--      {@html contrastWCAG3.toString().replace('-', '\u2212')}-->
    <!--    </span> -->
  </div>
</div>

<style>
  .lightness {
    display: flex;
    flex-direction: column;
    min-width: 10em;
    padding: 0.75em 1em;
    font-size: 0.75rem; /* 12px */
  }

  .shade {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .shade label {
    min-width: 2.2em; /* To keep 50’s input aligned with the rest */
    margin-right: 0.25em;
  }

  input {
    width: 4em;
  }

  .contrast-ratio {
    margin-top: 0.3636em;
    line-height: 1.25em;
  }

  .zero {
    opacity: 0.33;
  }

  .pass {
    color: var(--c-green-600);
    font-weight: 600;
  }

  .fail {
    color: var(--c-red-600);
    text-decoration: line-through;
  }
</style>
