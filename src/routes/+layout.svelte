<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { dev, browser } from '$app/environment';

	let { children } = $props();

	onMount(() => {
		if (!browser) return;

		// Initialize Google Analytics (only in production)
		if (dev) {
			// Mock gtag function in development to prevent tracking test events
			window.gtag = function () {
				console.log('🚫 Google Analytics (DEV - not tracked):', ...arguments);
			};
			console.log('Google Analytics: Disabled (development mode)');
		} else {
			// Google Analytics is loaded via script tag in <svelte:head>
			// Just log that it's initialized
			console.log('Google Analytics: Initialized (production)');
		}

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
	});
</script>

<svelte:head>
	<!-- Preload critical fonts for optimal performance -->
	<link
		rel="preload"
		href="/fonts/londrina-solid-latin-400-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/poppins-latin-600-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<!-- Google tag (gtag.js) - production only -->
	{#if !dev}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-PRBBNH8JRZ"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'G-PRBBNH8JRZ');
		</script>
	{/if}
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
</svelte:head>

<div class="flex min-h-screen w-full flex-col overflow-x-hidden">
	{@render children()}
</div>
