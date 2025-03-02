<script>
  import Preview from './Preview.svelte';
  import wildbitLogo from '../assets/wildbit-logo.svg';
</script>

<div class="description">
  <div class="content">
    <div class="columns">
      <div class="column">
        <h2>Stop using HSL for color systems!</h2>
        <p>
          <strong>HSL</strong> is an alternative representation of the RGB color model. It’s the most common way to
          specify color in design tools, but it has
          <a href="https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages" target="_blank">an inherent fault</a>
          — <em>Lightness</em> and <em>Saturation</em> don’t reflect human perception. Compare <Preview color="#33F" /> blue
          and <Preview color="#0F0" /> green&nbsp;— while both have a <em>Lightness</em> of 50, blue looks much darker.
        </p>
        <p>
          This becomes a problem when building a color system with HSL, as lightness and contrast are inconsistent
          across color levels. Following contrast recommendations from <a
            href="https://www.w3.org/TR/WCAG21/"
            target="_blank">Web Content Accessibility Guidelines</a
          > is barely possible when every color pair needs to be checked individually.
        </p>

        <h2>What is CIELAB and LCh?</h2>
        <p>
          Unlike the RGB, the <a href="https://en.wikipedia.org/wiki/CIELAB_color_space" target="_blank"
            >CIELAB color model</a
          >
          is designed to approximate human vision, and <em>L</em> component closely matches the human perception of
          lightness. It may be tricky to use it directly (just as RGB), but there are alternative representations like
          <strong>LCh</strong> (<em>C</em>&nbsp;is for <em>Chroma</em>) that work similarly to HSL.
        </p>
        <p>
          In this color model, colors with the same specified <em>Lightness</em> have the same perceived lightness and
          WCAG contrast ratio. The same <Preview color="#366BFF" /> blue and <Preview color="#008B00" /> green with
          <em>Lightness</em> of 50 look consistent and have a contrast ratio of 4.5:1 against white, meeting WCAG requirement.
        </p>
      </div>

      <div class="column">
        <h2>How does <em>Accessible Palette</em> work?</h2>
        <p>
          This app uses the <a href="https://gka.github.io/chroma.js/">chroma.js</a> library to generate color ranges with
          consistent lightness between levels. A few things to keep in mind:
        </p>
        <ul>
          <li>
            Start with pasting your brand colors or tweak the default palette. Adjust <em>C</em> (Chroma) to make colors
            more or less saturated, or tweak their <em>H</em> (Hue).
          </li>
          <li>
            Color ranges can be calculated using <strong>RGB or CIELAB</strong>. Depending on the starting color, they
            may produce different results. (Blue and purple in the default palette are good starting points for
            experimenting.)
          </li>
          <li>
            The <strong>Hue</strong> of the color range can be shifted as it progresses. For example, <Preview
              color="#DDE46E"
            /> citrus yellow can become <Preview color="#665A0C" /> brownish as it gets darker, instead of <Preview
              color="#4F6015"
            /> greenish without correction.
          </li>
          <li>
            The <strong>Contrast Ratio</strong> is calculated for every color level against white background based on
            the current WCAG 2.1 Recommendation and an upcoming
            <a href="https://www.w3.org/TR/wcag-3.0/#visual-contrast-of-text" target="_blank">Working Draft 3.0</a>.
            (They’re moving to a more accurate algorithm.)
          </li>
          <li>
            <strong>Select any color swatch</strong> to recalculate Contrast Ratios against it as a background. Adjust lightness
            levels to reach Contrast Ratios meeting WCAG recommendations.
          </li>
          <li>
            <strong>Every palette has a unique URL</strong>&nbsp;— save it to your Figma library or code repository to
            tweak or extend in the future.
          </li>
        </ul>
      </div>
    </div>

    <div class="blog-post">
      <div class="blog-post_wrap">
        <p>
          <span class="blog-post_heading">All the “whys” and “hows” in a blog post:</span>
          <a
            target="_blank"
            href="https://www.wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems"
            >Accessible Palette: Stop using HSL for color systems</a
          >
        </p>
      </div>
    </div>
  </div>

  <div class="content footer">
    <p>
      &copy;
      <a href="https://efedorenko.com" target="_blank">Eugene&nbsp;Fedorenko</a>
    </p>
  </div>
</div>

<style>
  .description {
    padding: var(--pad2x) var(--pad);
    background-color: var(--c-slate-900);
    color: var(--c-slate-300);
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
    margin-top: var(--pad2x);
    font-size: 0.75rem; /* 12px */
    line-height: 1.25;
  }
  .footer p {
    margin: 0 0 0 1em;
  }
  .footer a:link,
  .footer a:visited {
    color: inherit;
  }
  .wildbit-logo {
    display: inline-block;
    width: auto;
    height: 28px;
    vertical-align: middle;
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.6em;
  }
  .columns :last-child {
    margin-bottom: 0;
  }
  @media only screen and (min-width: 769px) {
    .columns {
      grid-template-columns: repeat(2, 1fr);
      column-gap: var(--pad2x);
      row-gap: 0;
    }
  }

  /* Blog post */
  .blog-post {
    margin-top: var(--pad2x);
    border-radius: 5px;
    padding: 2px;
    background-image: linear-gradient(var(--rainbow-60));
  }
  .blog-post_wrap {
    border-radius: 4px;
    padding: var(--pad);
    background-color: var(--c-slate-900);
    text-align: center;
  }
  .blog-post p {
    display: inline-block;
    text-align: left;
  }
  .blog-post_heading {
    display: block;
  }
  .blog-post a {
    font-size: 1.125rem; /* 18px */
    font-weight: 500;
  }

  h2 {
    margin: 2em 0 0.75em;
    color: #fff;
    font-weight: 600;
    font-size: 1.125rem; /* 18px */
  }
  h2:first-child {
    margin-top: 0;
  }

  p {
    margin: 0.4em 0 0.8em;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    margin: 0.4em 0 0.8em;
    padding: 0;
    list-style: none;
  }
  ul li::before {
    content: '‣';
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  strong,
  a:link,
  a:visited {
    color: var(--c-slate-100);
  }
  a:hover,
  a:active {
    color: #fff;
  }
</style>
