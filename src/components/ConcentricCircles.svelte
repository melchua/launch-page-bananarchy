<script>
	export let maxSize = 1100;
	export let spacing = 100;
	export let colors = ['#f5991a', '#f7a619', '#fab71e', '#fdd223'];
</script>

<svg width={maxSize} height={maxSize} viewBox="0 0 {maxSize} {maxSize}">
	{#each Array(colors.length).fill(0) as _, i}
		<circle
			cx={maxSize / 2}
			cy={maxSize / 2}
			r={maxSize / 2 - i * spacing}
			stroke={colors[i % colors.length]}
			stroke-width="2"
			fill={colors[i % colors.length]}
		/>
	{/each}
</svg>
