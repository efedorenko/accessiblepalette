<script>
	import chroma from 'chroma-js';

	export let bColor;
</script>

<th>
	{bColor.name}<br>
	<input type="text" size="7" value={bColor.color} data-name={bColor.name} class="js-change-base-color"><br>
	L: <input type="text" size="5" value={chroma(bColor.color).get('lch.l')} data-name={bColor.name} class="js-set-base-color-from-l"><br>
	C: <input type="text" size="5" value={chroma(bColor.color).get('lch.c')} data-name={bColor.name} class="js-set-base-color-from-c"><br>
	H: <input type="text" size="5" value={chroma(bColor.color).get('lch.h')} data-name={bColor.name} class="js-set-base-color-from-h"><br>

	<label>
		<input type="checkbox" checked={bColor.isLab} data-name={bColor.name} class="js-change-base-color-model"> LAB
	</label>
</th>
