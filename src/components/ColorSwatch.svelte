<script lang="ts">
  import chroma from 'chroma-js';
  import {
    bgColor,
    defaultBgColor,
    lightnessWithContrasts,
    minContrastRatioWCAG2,
    minContrastRatioWCAG3
  } from '../stores';
  import type { ShadeInterface } from '../stores';
  import { getWcag2CR, getWcag3CR, roundTo10th } from '../helpers';
  import type { Palette } from '../generatePalette';
  import { afterUpdate } from 'svelte';

  export let color: Palette, shade: string;

  $: contrastWCAG2 = getWcag2CR(color.color, $bgColor);
  $: contrastWCAG3 = getWcag3CR(color.color, $bgColor);

  $: lightness = $lightnessWithContrasts[shade] as ShadeInterface;

  let c: number = roundTo10th(chroma(color.color).get('lch.c')) || 0;
  let h: number = roundTo10th(chroma(color.color).get('lch.h')) || 0;

  let isSelected = false;

  bgColor.subscribe((store: string) => {
    isSelected = store === color.color;
  });

  // Update bgColor when color is selected
  function selectColor(): void {
    if (!isSelected) {
      bgColor.set(color.color);
    } else {
      bgColor.set($defaultBgColor);
    }
  }

  // Update bgColor when color was selected and then changed by adjusting lightness
  afterUpdate(() => {
    if (isSelected && $bgColor !== color.color) {
      bgColor.set(color.color);
    }
  });
</script>

<div
  style="background-color: {color.color};"
  on:click={selectColor}
  class={['swatch', isSelected ? 'selected' : '', lightness.value >= 60 ? 'dark' : 'light'].join(' ')}
  data-shade={shade}
  title="Chroma: {c}, Hue: {h}, WCAG 2: {contrastWCAG2}:1, WCAG 3: {contrastWCAG3}"
>
  <span class="hex">{color.color.toUpperCase()}</span>

  <span class="wcag wcag2 {contrastWCAG2 >= minContrastRatioWCAG2 ? 'pass' : 'fail'}">
    {#if !isSelected && lightness.minWcag2 !== lightness.maxWcag2}
      {contrastWCAG2}
    {/if}
  </span>

  <span class="wcag wcag3 {contrastWCAG3 >= minContrastRatioWCAG3 ? 'pass' : 'fail'}">
    {#if !isSelected && lightness.minWcag3 !== lightness.maxWcag3}
      {contrastWCAG3}
    {/if}
  </span>
</div>

<style>
  .light {
    --shade: rgba(255, 255, 255, 0.15);
    --text: rgb(255, 255, 255);
  }
  .dark {
    --shade: rgba(0, 0, 0, 0.15);
    --text: rgb(0, 0, 0);
  }

  .swatch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1.25em;

    padding: 0.75em; /* 9px */
    color: var(--text);
    font-size: 0.75rem; /* 12px */
    white-space: nowrap;
    cursor: pointer;
  }
  .selected {
    background: repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 6px,
      var(--shade) 6px,
      var(--shade) 7px
    );
  }

  .hex {
    grid-column-end: span 2;
    align-self: center;

    text-align: center;
    font: 1em 'iA Writer Duo', monospace, sans-serif;
    letter-spacing: 0.1em;
    opacity: 0.66;
    transition: opacity 0.3s;
  }
  .swatch:hover .hex {
    opacity: 1;
  }
  .wcag {
    line-height: 1.25em;
    opacity: 0.33;
    transition: opacity 0.3s;
  }
  .swatch:hover .wcag {
    opacity: 1;
  }
  .wcag3 {
    justify-self: end;
  }

  .pass {
  }
  .fail {
    text-decoration: line-through;
  }
</style>
