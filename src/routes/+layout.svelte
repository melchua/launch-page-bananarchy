<script lang="ts">
	import '../app.css';
	// Londrina Solid is loaded via @font-face in app.css with font-display: block
	import '@fontsource/poppins';
	import '@fontsource/poppins/800.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/500.css';

	import { onMount } from 'svelte';
	import { dev, browser } from '$app/environment';

	// import posthog from 'posthog-js';
	// import { beforeNavigate, afterNavigate } from '$app/navigation';

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

	// MailerLite account switching
	const mlAccountId = dev ? '2141608' : '1445244';

	onMount(() => {
		if (!browser) return;

		// Initialize Meta Pixel (only in production)
		if (dev) {
			// Mock fbq function in development to prevent tracking test events
			window.fbq = function () {
				console.log('🚫 Meta Pixel (DEV - not tracked):', ...arguments);
			};
			console.log('Meta Pixel: Disabled (development mode)');
		} else {
			// Load Meta Pixel in production
			!(function (f, b, e, v, n, t, s) {
				if (f.fbq) return;
				n = f.fbq = function () {
					n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
				};
				if (!f._fbq) f._fbq = n;
				n.push = n;
				n.loaded = !0;
				n.version = '2.0';
				n.queue = [];
				t = b.createElement(e);
				t.async = !0;
				t.src = v;
				s = b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t, s);
			})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
			window.fbq('init', '1177216143869570');
			window.fbq('track', 'PageView');
			// console.log('Meta Pixel: Initialized (production)');
		}

		// Initialize MailerLite Universal
		!(function (w, d, e, u, f, l, n) {
			w[f] =
				w[f] ||
				function () {
					(w[f].q = w[f].q || []).push(arguments);
				};
			l = d.createElement(e);
			l.async = 1;
			l.src = u;
			n = d.getElementsByTagName(e)[0];
			n.parentNode.insertBefore(l, n);
		})(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');

		// Use dev or production account
		window.ml('account', mlAccountId);
		// console.log('MailerLite: Using account', mlAccountId, dev ? '(dev)' : '(production)');
	});
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
	<!-- Meta Pixel noscript fallback (production only) -->
	{#if !dev}
		<noscript>
			<img
				height="1"
				width="1"
				style="display:none"
				src="https://www.facebook.com/tr?id=1177216143869570&ev=PageView&noscript=1"
				alt=""
			/>
		</noscript>
	{/if}
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
</svelte:head>

<div class="flex min-h-screen w-full flex-col overflow-x-hidden">
	{@render children()}
</div>
