<script lang="ts">
  import chroma from 'chroma-js';
  import { colorStringToHex, roundTo10th, roundToWhole } from '../helpers';
  import type { LightnessInterface } from '../stores';
  import { bgColor, lightnessShades } from '../stores';
  import { APCAcontrast } from '../vendor/APCAonly.98e_d12e';
  import Preview from './Preview.svelte';

  export let shade: string;

  // TODO: make a little more consistent?

  let bg: string;
  bgColor.subscribe((store: string) => {
    bg = store;
  });

  let lightness: number;
  lightnessShades.subscribe((store: LightnessInterface) => {
    lightness = store[shade];
  });

  $: previewColor = chroma('#808080').set('lch.l', lightness) as chroma.Color;

  const minContrastRatioWCAG2 = 4.5;
  $: contrastWCAG2 = roundTo10th(chroma.contrast(previewColor, bg)) as number;

  const minContrastRatioWCAG3 = 60;
  $: contrastAPCA = APCAcontrast(colorStringToHex(bg), colorStringToHex(previewColor.toString())) as number;
  $: contrastWCAG3 = roundToWhole(contrastAPCA) as number;

  $: noContrast = (contrastWCAG2 === 1 && contrastWCAG3 >= -1 && contrastWCAG3 <= 1) as boolean;

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
    <Preview color={bg} style="margin-left: -0.75em; margin-right: .125em;" />
    <Preview color={previewColor} style="margin-right: .25em;" />
    <label for="shade-{shade}">{shade}:</label>
    <input type="number" id="shade-{shade}" size="5" value={lightness} on:change={changeLightness} min="0" max="100" />
  </div>

  <div class={`contrast-ratio ${noContrast ? 'zero' : ''}`}>
    WCAG 2: <span class={contrastWCAG2 >= minContrastRatioWCAG2 ? 'pass' : 'fail'}>{@html contrastWCAG2}</span>
  </div>
  <div class={`contrast-ratio ${noContrast ? 'zero' : ''}`}>
    WCAG 3: <span class={Math.abs(contrastWCAG3) >= minContrastRatioWCAG3 ? 'pass' : 'fail'}
      >{@html contrastWCAG3.toString().replace('-', '\u2212')}</span
    >
  </div>
</div>

<style>
  .lightness {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.75rem; /* 12px */
    padding: 0.75em 1em;
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
  }

  .zero {
    opacity: 0.33;
  }

  .pass {
    color: #308559;
    font-weight: 500;
  }

  .fail {
    color: #af6334;
    text-decoration: line-through;
  }
</style>
