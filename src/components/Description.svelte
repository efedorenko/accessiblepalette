<script>
  import Preview from './Preview.svelte';
  import wildbitLogo from '../assets/wildbit-logo.svg';
</script>

<div class="description">
  <div class="content">
    <h1>
      <strong>🎨 Accessible Palette:</strong>
      Create color systems with consistent lightness and contrast
    </h1>

    <div class="columns">
      <div class="column">
        <h2>Stop using HSL for color systems!</h2>
        <p><strong>HSL</strong> is an alternative representation of the RGB color model. It’s the most common way to specify color in design tools, but it has <a href="https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages" target='_blank'>an inherent fault</a> — <em>Lightness</em> and <em>Saturation</em> don’t reflect human perception. Compare <Preview color='#33F' /> blue and <Preview color='#0F0' /> green&nbsp;— while both have a <em>Lightness</em> of 50, blue looks much darker.</p>
        <p>This becomes a problem when building a color system with HSL, as lightness and contrast are inconsistent across colors. Following contrast recommendations from <a href="https://www.w3.org/TR/WCAG21/" target="_blank">Web Content Accessibility Guidelines</a> is barely possible when every color pair needs to be checked individually.</p>

        <h2>What is Lab and HCL/Lch?</h2>
        <p>Unlike the RGB, the <a href="https://en.wikipedia.org/wiki/CIELAB_color_space" target="_blank">Lab color model</a> is designed to approximate human vision, and <em>L</em> component closely matches the human perception of lightness. It may be tricky to use it directly (just as RGB), but there are alternative representations <strong>HCL</strong> or <strong>Lch</strong> that work similarly to HSL. (<em>C</em> is for <em>Chroma</em>.)</p>
        <p>In this color model, colors with the same specified <em>Lightness</em> have the same perceived lightness and WCAG contrast ratio. Our <Preview color='#366BFF' /> blue and <Preview color='#008B00' /> green look consistent and have a contrast ratio of 4.5:1 against white, meeting WCAG requirement.</p>
      </div>

      <div class="column">
        <h2>How does <em>Accessible Palette</em> works?</h2>
        <p>This app uses the <a href="https://gka.github.io/chroma.js/">chroma.js</a> library to generate color ranges with consistent lightness between levels. A few things to keep in mind:</p>
        <ul>
          <li>Start with pasting your brand colors or tweak the default palette. Adjust <em>C</em> (Chroma) to make colors more or less saturated, or tweak their <em>H</em> (Hue).</li>
          <li>Color ranges can be calculated using standard <strong>RGB or Lab</strong>. Depending on the starting color, they may produce different results. (Blue and purple in the default palette are good starting places to experiment with.)</li>
          <li>The <strong>Hue</strong> of the color range can be shifted as it progresses. For example, <Preview color='#DDE46E' /> citrus yellow can get <Preview color='#665A0C' /> brownish as it gets darker (vs. <Preview color='#4F6015' /> without correction).</li>
          <li>The <strong>Contrast Ratio</strong> is calculated for every color level against white background based on the current WCAG 2.1 Recommendation and an upcoming <a href="https://www.w3.org/TR/wcag-3.0/#visual-contrast-of-text" target='_blank'>Working Draft 3.0</a>. (They’re moving to a more accurate algorithm.)</li>
          <li><strong>Select any color swatch</strong> to recalculate Contrast Ratios against it as a background. Adjust lightness levels to reach Contrast Ratios meeting WCAG recommendations.</li>
          <li><strong>Every palette has a unique URL</strong>&nbsp;— save it to your Figma library or code repository to tweak or extend in the future. </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="content footer">
    <a href="https://wildbit.com" target="_blank"><img src={wildbitLogo} alt='Wildbit' class='wildbit-logo'></a>
    <p>Copyright © 2021 <a href="https://wildbit.com" target="_blank">Wildbit LLC</a></p>
  </div>
</div>

<style>

  .description {
    padding: 60px 30px;
    background-color: var(--c-slate-900);
    color: var(--c-slate-300);
  }
  @media only screen and (min-width: 415px) {
    .description {
      padding: 80px 40px;
    }
  }

  .content {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 0;
    font-size: 0.9375rem; /* 15px */
    line-height: 1.5;
  }
  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 80px;
    color: var(--c-slate-400);
    font-size: 0.75rem; /* 12px */
    text-align: center;
  }
    .footer p {
      margin: 0;
    }
    .wildbit-logo {
      display: inline-block;
      width: auto;
      height: 28px;
      margin-right: 15px;
      vertical-align: middle;
    }

  .columns {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.6em;
  }
  @media only screen and (min-width: 769px) {
    .columns {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 3.75rem; /* 60px */
      row-gap: 0;
    }
  }

  h1 {
    margin: 0 0 3.333em; /* 80px */
    color: #FFF;
    font-size: 1.5rem; /* 24px */
    font-weight: normal;
    text-align: center;
  }
    h1 strong {
      color: inherit;
      font-weight: 600;
    }

  h2 {
    margin: 2em 0 .75em;
    color: #FFF;
    font-weight: 600;
    font-size: 1.125rem; /* 18px */
  }
    h2:first-child {
      margin-top: 0;
    }

  p {
    margin: .4em 0 .8em;
  }
  ul {
    margin: 0;
    padding: 0 0 0 1.2em;
  }
  ul li {
    margin: .4em 0 .8em;
    padding: 0;
    list-style-type: circle;
  }
  strong,
  a:link,
  a:visited {
    color: var(--c-slate-100);
  }
  a:hover,
  a:active {
    color: #FFF;
  }
</style>
