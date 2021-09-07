<script>
  export let color, style;
</script>

<span class="preview" style="background-color: {color}; {style}" />

<style>
  .preview {
    display: inline-block;
    width: 0.625rem; /* 10px */
    height: 0.625rem; /* 10px */
    border-radius: 1px;
    background-color: var(--c-slate-100);
  }
</style>
