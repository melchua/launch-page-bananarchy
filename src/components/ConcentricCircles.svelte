<script>
	export let maxSize = 1100;
	export let spacing = 100;
	export let colors = ['#f5991a', '#f7a619', '#fab71e', '#fdd223'];
	export let width = maxSize;

	$: size = width || maxSize;
</script>

<svg width={size} height={size} viewBox="0 0 {size} {size}">
	{#each Array(colors.length).fill(0) as _, i}
		<circle
			cx={size / 2}
			cy={size / 2}
			r={size / 2 - i * spacing}
			stroke={colors[i % colors.length]}
			stroke-width="2"
			fill={colors[i % colors.length]}
		/>
	{/each}
</svg>
