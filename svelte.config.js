// Notes on how to deploy an SSG to Cloudflare Pages
// https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({ pages: 'build', assets: 'build', fallback: null, precompress: false }),
		prerender: {
			// This ensures all routes are prerendered
			default: true
		}
	}
};

export default config;
