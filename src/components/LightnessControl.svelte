<script>
  import chroma from 'chroma-js';
  import { roundTo10th, roundToWhole } from '../helpers';
  import { lightnessSteps, bgColor, defaultBgColor } from '../stores';
  import { APCAcontrast } from '../vendor/APCAonly.98e_d12e';
  import Preview from './Preview.svelte';

  export let step;

  // TODO: make a little more consistent?
  // TODO: rename "steps" to "shades"?

  let bg;
  bgColor.subscribe(store => {
    bg = store;
  });

  let lightness;
  lightnessSteps.subscribe(store => {
    lightness = store[step];
  });

  const minContrastRatioWCAG2 = 4.5;
  $: previewColor = chroma('#808080').set('lch.l', lightness);
  $: contrastWCAG2 = roundTo10th(chroma.contrast(previewColor, bg));
  $: contrastWCAG2Badge = contrastWCAG2 >= minContrastRatioWCAG2 ? contrastWCAG2 : `<s class='fail'>${contrastWCAG2}</s>`;
  $: contrastWCAG3 = APCAcontrast(bg.replace('#', '0x'), previewColor.toString().replace('#', '0x'));
  $: wcag3contrast = roundToWhole(contrastWCAG3);
  $: noContrast = (contrastWCAG2 === 1 && wcag3contrast >= -1 && wcag3contrast <= 1);

  const changeLightness = (event) => {
    const value = event.target.value;

    lightnessSteps.update(store => {
      store[step] = value;
      return store;
    });
  };
</script>

<div class='lightness'>
  <div class='shade'>
    <Preview color={bg} style='margin-left: -0.75em; margin-right: .125em;' />
    <Preview color={previewColor} style='margin-right: .25em;' />
    <label for='step-{step}'>{step}:</label>
    <input type='number' id='step-{step}' size='5' value={lightness} on:change={changeLightness} min='0' max='100'>
  </div>

  <div class={`contrast-ratio ${noContrast ? 'zero' : ''}`}>
    WCAG 2: <span class={contrastWCAG2 >= minContrastRatioWCAG2 ? 'pass' : 'fail'}>{@html contrastWCAG2Badge}</span>
  </div>
  <div class={`contrast-ratio ${noContrast ? 'zero' : ''}`}>
    WCAG 3: {@html wcag3contrast.toString().replace('-', '\u2212')}
  </div>
</div>

<style>
  .lightness {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.75rem; /* 12px */
    padding: .75em 1em .75em 1.5em;
  }

  .shade {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .shade label {
    flex: 1;
  }

  input {
    width: 4em;
  }

  .contrast-ratio {
    margin-top: .3636em;
  }

  .zero {
    opacity: .33;
  }

  .pass {
    color: #308559;
  }

  .fail {
    color: #AF6334;
  }
</style>
