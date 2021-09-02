<script>
  export let title;
</script>

<h2>{title}</h2>

<style>
  h2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5em;
    color: #000;
    font-weight: bold;
    font-size: 0.875rem; /* 14px */
    text-align: center;
  }
  h2::before,
  h2::after {
    content: '';
    flex: 1;
    height: 1px;
    margin-bottom: -1px;
    background-color: var(--c-rulers);
  }
  h2::before {
    margin-right: .5em;
  }
  h2::after {
    margin-left: .5em;
  }
</style>
