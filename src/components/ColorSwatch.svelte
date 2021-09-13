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

<div class="container">
  <div
    on:click={selectColor}
    class={['swatch', isSelected ? 'is-selected' : '', lightness.value >= 60 ? 'dark' : 'light'].join(' ')}
    style="background-color: {color.color};"
  >
    <span class="lch l">
      <span class="label">L:</span> <span class="value">{lightness.value}</span>
    </span>
    <span class="lch c">
      <span class="label">C:</span> <span class="value">{c}</span>
    </span>
    <span class="lch h">
      <span class="label">H:</span> <span class="value">{h}</span>
    </span>

    <span class="hex">
      {color.color.toUpperCase()}
    </span>

    <span
      class={[
        'wcag',
        'wcag2',
        !isSelected && lightness.minWcag2 !== lightness.maxWcag2 ? 'is-visible' : 'is-hidden'
      ].join(' ')}
    >
      <span class="label">WCAG 2:</span>
      <span class="value {contrastWCAG2 >= minContrastRatioWCAG2 ? 'pass' : 'fail'}">{contrastWCAG2}</span>
    </span>
    <span
      class={[
        'wcag',
        'wcag3',
        !isSelected && lightness.minWcag3 !== lightness.maxWcag3 ? 'is-visible' : 'is-hidden'
      ].join(' ')}
    >
      <span class="label">WCAG 3:</span>
      <span class="value {contrastWCAG3 >= minContrastRatioWCAG3 ? 'pass' : 'fail'}">{contrastWCAG3}</span>
    </span>
  </div>
</div>

<style>
  .light {
    --shade: rgba(255, 255, 255, 0.15);
    --meta: rgba(255, 255, 255, 0.33);
    --base: rgba(255, 255, 255, 0.66);
    --accent: rgb(255, 255, 255);
  }
  .dark {
    --shade: rgba(0, 0, 0, 0.15);
    --meta: rgba(0, 0, 0, 0.33);
    --base: rgba(0, 0, 0, 0.66);
    --accent: rgb(0, 0, 0);
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .swatch {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1.25em 1fr 1.25em; /* 1.25em = 15px */

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.75em; /* 9px */
    color: var(--base);
    font-size: 0.75rem; /* 12px */
    white-space: nowrap;
    cursor: pointer;
  }
  .swatch:hover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: calc(100% + 1.5em);
    min-width: 15em;
    height: calc(100% + 1.5em);

    border-radius: 3px;
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .is-selected {
    background: repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 6px,
      var(--shade) 6px,
      var(--shade) 7px
    );
  }

  /* Labels & Values */
  .label {
    display: none;
  }
  .swatch:hover .label {
    display: inline-block;
  }
  .value {
    font-weight: 500;
  }
  .swatch:hover .value {
    color: var(--accent);
  }

  /* LCh */
  .lch {
    grid-column-end: span 2;
    opacity: 0;
  }
  .swatch:hover .lch {
    opacity: 1;
  }
  .l {
    text-align: left;
  }
  .c {
    text-align: center;
  }
  .h {
    text-align: right;
  }

  /* Hex Color */
  .hex {
    grid-column-end: span 6;
    align-self: center;

    color: var(--base);
    text-align: center;
    font: 1em 'iA Writer Duo', monospace, sans-serif;
    letter-spacing: 0.1em;
  }
  .swatch:hover .hex {
    color: var(--accent);
  }

  /* WCAG */
  .wcag {
    grid-column-end: span 3;
    line-height: 1.25em;
    color: var(--meta);
  }
  .swatch:hover .wcag {
    color: var(--base);
  }

  .is-hidden {
    opacity: 0;
  }
  .swatch:hover .is-hidden {
    opacity: 1;
  }
  .is-visible {
    opacity: 1;
  }

  .wcag2 {
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
