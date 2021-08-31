<script>
	export let bColor, changeHueCorrection;

	let value = bColor.hueCorrection;
</script>

<th>
	<input type="number" size="5" bind:value={value} on:change={() => changeHueCorrection(bColor.name, value)} min=-180 max=180>
</th>
