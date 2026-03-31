import { writable } from 'svelte/store';

// Create a writable store with default value of 528
export const subscriberCount = writable<number>(528);

// Function to fetch the latest subscriber count from the API
export async function fetchSubscriberCount() {
	try {
		const response = await fetch('/api/mailerlite/stats');

		if (response.ok) {
			const data = await response.json();
			subscriberCount.set(data.count);
		} else {
			console.error('Failed to fetch subscriber count:', response.status);
			// Keep default value
		}
	} catch (error) {
		console.error('Error fetching subscriber count:', error);
		// Keep default value
	}
}
