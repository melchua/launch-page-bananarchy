<script lang="ts">
	import type { HeadlineVariant } from '$lib/variants';

	let { variant }: { variant: HeadlineVariant } = $props();
</script>

<div class="lifestyle-bar relative">
	<enhanced:img
		src="$lib/assets/banana-spread-web.jpg?w=1920;1600;1280;960;720;480;360"
		alt="lifestyle bar"
		class="h-full w-full object-cover"
		sizes="100vw"
		loading="lazy"
	/>

	<!-- Text overlay -->
	<div class="absolute inset-0 flex items-center justify-center bg-black/20">
		<h3 class="p-6 text-center text-xl font-bold text-white sm:text-4xl md:text-5xl">
			{@html variant.lifestyle}
		</h3>
	</div>
</div>
