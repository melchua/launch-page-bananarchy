<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	onMount(() => {
		if (!browser) return;

		// Listen for MailerLite form submission event
		const handleFormSubmit = (event) => {
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
	<div class="ml-embedded" data-form="6rXIiU"></div>
</div>
