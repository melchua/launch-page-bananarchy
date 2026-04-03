<script lang="ts">
	import { useVariant } from '$lib/useVariant.svelte';

	const { variant } = useVariant();
</script>

<div class="lifestyle-bar relative">
	<enhanced:img
		src="$lib/assets/banana-spread-web.jpg"
		alt="lifestyle bar"
		class="h-full w-full object-cover"
	/>

	<!-- Text overlay -->
	<div class="absolute inset-0 flex items-center justify-center bg-black/20">
		<h3 class="p-6 text-center text-xl font-bold text-white sm:text-4xl md:text-5xl">
			{@html variant.lifestyle}
		</h3>
	</div>
</div>
