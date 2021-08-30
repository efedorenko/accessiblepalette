<script>
	export let step, lightness, changeLightness;

	let value = lightness;
</script>

<th>
	{step}<br>
	L: <input type="number" size="5" bind:value={value} on:change={() => changeLightness(step, value)} min=0 max=100>
</th>

<style>
	input {
		width: 5em;
	}
</style>