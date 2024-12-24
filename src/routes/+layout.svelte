<script lang="ts">
	import '../app.css';
	import '@fontsource/londrina-solid';
	import '@fontsource/poppins';

	// import posthog from 'posthog-js';
	// import { beforeNavigate, afterNavigate } from '$app/navigation';
	// import { browser } from '$app/environment';

	export const prerender = true;

	// export const load = async () => {
	// 	if (browser) {
	// 		posthog.init('phc_dQL4w1lcT9beEs5Dfpc6qt7vDez8OR4OombqZzu2cGl', {
	// 			api_host: 'https://us.i.posthog.com',
	// 			person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
	// 		});
	// 	}
	// 	return;
	// };

	// if (browser) {
	// 	beforeNavigate(() => posthog.capture('$pageleave'));
	// 	afterNavigate(() => posthog.capture('$pageview'));
	// }

	let { children } = $props();
</script>

{@render children()}
