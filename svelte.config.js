// Notes on deploying to Cloudflare Pages with adapter-cloudflare
// https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/

import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-cloudflare supports both static prerendered pages and dynamic server routes
		// Pages are still prerendered via export const prerender = true in +layout.ts
		// API routes work seamlessly in both dev and production
		adapter: adapter({
			// Cloudflare Pages compatibility
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};

export default config;
