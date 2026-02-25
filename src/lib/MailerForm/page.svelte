<script>
	import { onMount } from 'svelte';
	import { browser, dev } from '$app/environment';

	// Use dev form in development, production form in production
	const formId = dev ? 'PpGtBJ' : '6rXIiU';

	onMount(() => {
		if (!browser) return;

		// Listen for MailerLite form submission event
		const handleFormSubmit = (event) => {
			// Only process messages from MailerLite (silently ignore others like Vite HMR, SvelteKit, etc.)
			if (!event.origin.includes('mailerlite.com')) {
				return;
			}

			// Log only MailerLite messages
			console.log('MailerLite message received:', event.data);

			// Check for MailerLite success event
			if (event.data === 'mailerLiteFormSubmitSuccess') {
				// Track form submission with Meta Pixel
				if (typeof window.fbq === 'function') {
					window.fbq('track', 'Lead');
					console.log('Meta Pixel: Lead event tracked');
				}
			}
		};

		window.addEventListener('message', handleFormSubmit);

		// Cleanup listener on component destroy
		return () => {
			window.removeEventListener('message', handleFormSubmit);
		};
	});
</script>

<div class="w-full">
	<div class="ml-embedded" data-form={formId}></div>
</div>
