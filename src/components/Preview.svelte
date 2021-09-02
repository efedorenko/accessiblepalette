<script>
  export let color, style;
</script>

<span class='preview' style='background-color: {color}; {style}'></span>

<style>
  .preview {
    display: inline-block;
    width: 0.625rem; /* 10px */
    height: 0.625rem; /* 10px */
    background-color: #EEE;
  }
</style>
