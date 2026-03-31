import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAILERLITE_API_KEY, GROUP_ID } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		// Validate input
		if (!email || typeof email !== 'string') {
			return json({ error: 'Email is required' }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		// Check if API key is configured
		if (!MAILERLITE_API_KEY) {
			console.error('MAILERLITE_API_KEY is not configured');
			return json({ error: 'Server configuration error' }, { status: 500 });
		}

		// Submit to MailerLite API
		const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${MAILERLITE_API_KEY}`,
				Accept: 'application/json'
			},
			body: JSON.stringify({
				email,
				status: 'active', // Mark subscriber as active (bypasses double opt-in)
				groups: [GROUP_ID] // Add subscriber to the main group (non-vip)
			})
		});

		console.log('MailerLite API response:', response);
		const data = await response.json();

		if (!response.ok) {
			console.error('MailerLite API error:', data);

			// Handle specific MailerLite errors
			if (response.status === 422 && data.message?.includes('already exists')) {
				return json({ error: 'This email is already subscribed' }, { status: 400 });
			}

			return json({ error: data.message || 'Failed to subscribe' }, { status: response.status });
		}

		// Success!
		return json({ success: true, data });
	} catch (error) {
		console.error('Form submission error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
