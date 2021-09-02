<script>
  export let title;
</script>

<div class='container'>
  <h2>
    <span>{title}</span>
  </h2>
</div>

<style>
  .container {
    width: 1.75em;
  }

  h2 {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0 .5em;
    color: #000;
    font-weight: bold;
    font-size: 0.875rem; /* 14px */
  }

  h2::before,
  h2::after {
    content: '';
    flex: 1;
    width: 1px;
    background-color: var(--c-rulers);
  }

  h2::before {
    margin-bottom: .5em;
  }

  h2::after {
    margin-top: .5em;
  }

  span {
    flex-shrink: 0;
    padding: 0 .5em;
    transform: rotate(-90deg);
    transform-origin: center;
    white-space: nowrap;
    background-color: #FFF;
  }
</style>
