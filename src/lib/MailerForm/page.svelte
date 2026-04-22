<script>
	import { subscriberCount } from '$lib/stores/subscriberCount';

	// Props
	let { disablePulse = false, darkMode = false } = $props();

	// State management using Svelte 5 runes
	let email = $state('');
	let isSubmitting = $state(false);
	let submitStatus = $state('idle'); // 'idle' | 'success' | 'error'
	let errorMessage = $state('');

	// Email validation
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Reactive state for progressive glow
	let isEmailValid = $derived(email.length > 0);

	async function handleSubmit(event) {
		event.preventDefault();

		// Reset state
		submitStatus = 'idle';
		errorMessage = '';

		// Validate email
		if (!email || !isValidEmail(email)) {
			submitStatus = 'error';
			errorMessage = 'Please enter a valid email address';
			return;
		}

		isSubmitting = true;

		try {
			// Submit to MailerLite API
			const response = await fetch('/api/mailerlite', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to subscribe');
			}

			// Success!
			submitStatus = 'success';
			email = '';

			// Increment subscriber count for instant feedback
			subscriberCount.update((n) => n + 1);

			// Track form submission with Meta Pixel
			if (typeof window.fbq === 'function') {
				window.fbq('track', 'Lead');
				console.log('Meta Pixel: Lead event tracked');
			}

			// Redirect to thank you page
			window.location.href = '/thankyou';
		} catch (error) {
			console.error('Form submission error:', error);
			submitStatus = 'error';
			errorMessage = error.message || 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="w-full">
	<form onsubmit={handleSubmit} class="flex w-full flex-col gap-2">
		<div class="flex flex-col gap-2 sm:flex-row">
			<input
				type="email"
				bind:value={email}
				placeholder="Enter your email"
				disabled={isSubmitting || submitStatus === 'success'}
				class="flex-1 rounded-md border-2 border-gray-300 px-4 py-2 text-sm text-black placeholder-gray-500 transition-all focus:border-green-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {!isEmailValid &&
				!disablePulse
					? 'animate-pulse-glow'
					: ''}"
				aria-label="Email address"
				required
			/>
			<button
				type="submit"
				disabled={isSubmitting || submitStatus === 'success'}
				class="whitespace-nowrap rounded-md bg-secondary px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-[#1f8a38] focus:outline-none focus:ring-2 focus:ring-[#1f8a38] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if isSubmitting}
					Sending...
				{:else if submitStatus === 'success'}
					Subscribed!
				{:else}
					➡ Claim My Free Print & Play
				{/if}
			</button>
		</div>

		<p class="text-center text-xs {darkMode ? 'text-white/85' : 'text-black/70'}">
			Instant download. No credit card needed. Only {1500 - $subscriberCount} spots left.
		</p>

		{#if submitStatus === 'error'}
			<p class="text-sm text-red-500" role="alert">
				{errorMessage}
			</p>
		{/if}

		{#if submitStatus === 'success'}
			<p class="text-sm text-green-400" role="status">Success! Redirecting to your download...</p>
		{/if}
	</form>
</div>
