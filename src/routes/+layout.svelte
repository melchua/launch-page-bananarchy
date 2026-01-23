<script lang="ts">
	import '../app.css';
	// Londrina Solid is loaded via @font-face in app.css with font-display: block
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

<svelte:head>
	<!-- Preload Londrina Solid font to prevent FOUT/swap lag -->
	<link
		rel="preload"
		href="/fonts/londrina-solid-latin-400-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-PRBBNH8JRZ"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-PRBBNH8JRZ');
	</script>
<!-- MailerLite Universal -->
	<script>
		(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
		.push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
		n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
		(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
		ml('account', '1445244');
	</script>
<!-- End MailerLite Universal -->
</svelte:head>

<div class="h-[100vh] w-full">
	{@render children()}
</div>
