import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5173,
		cors: {
			origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Add both localhost and 127.0.0.1
			methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the allowed methods
			allowedHeaders: ['Content-Type', 'Authorization'] // Add any headers you want to allow
		}
	},
	plugins: [sveltekit(), enhancedImages()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
