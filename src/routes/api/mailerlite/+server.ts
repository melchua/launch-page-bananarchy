import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAILERLITE_API_KEY } from '$env/static/private';

// Form ID to Group ID mapping
const FORM_TO_GROUP_MAP: Record<string, string> = {
	PpGtBJ: '139476093355732942', // Dev form group ID
	'6rXIiU': '139476095146813403' // Production form group ID
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, formId } = await request.json();

		// Validate input
		if (!email || typeof email !== 'string') {
			return json({ error: 'Email is required' }, { status: 400 });
		}

		if (!formId || !FORM_TO_GROUP_MAP[formId]) {
			return json({ error: 'Invalid form ID' }, { status: 400 });
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

		const groupId = FORM_TO_GROUP_MAP[formId];

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
				groups: [groupId],
				status: 'active' // 'active' for double opt-in disabled
			})
		});

		const data = await response.json();

		if (!response.ok) {
			console.error('MailerLite API error:', data);

			// Handle specific MailerLite errors
			if (response.status === 422 && data.message?.includes('already exists')) {
				return json({ error: 'This email is already subscribed' }, { status: 400 });
			}

			return json(
				{ error: data.message || 'Failed to subscribe' },
				{ status: response.status }
			);
		}

		// Success!
		return json({ success: true, data });
	} catch (error) {
		console.error('Form submission error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
