// Cloudflare Pages Function for MailerLite form submission
// This function runs on Cloudflare's edge network

// Form ID to Group ID mapping
const FORM_TO_GROUP_MAP = {
	PpGtBJ: '139476093355732942', // Dev form group ID
	'6rXIiU': '139476095146813403' // Production form group ID
};

export async function onRequestPost(context) {
	const { request, env } = context;

	try {
		// Parse request body
		const { email, formId } = await request.json();

		// Validate input
		if (!email || typeof email !== 'string') {
			return new Response(JSON.stringify({ error: 'Email is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (!formId || !FORM_TO_GROUP_MAP[formId]) {
			return new Response(JSON.stringify({ error: 'Invalid form ID' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(JSON.stringify({ error: 'Invalid email format' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Check if API key is configured in Cloudflare environment
		const apiKey = env.MAILERLITE_API_KEY;
		if (!apiKey) {
			console.error('MAILERLITE_API_KEY is not configured');
			return new Response(JSON.stringify({ error: 'Server configuration error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const groupId = FORM_TO_GROUP_MAP[formId];

		// Submit to MailerLite API
		const mlResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
				Accept: 'application/json'
			},
			body: JSON.stringify({
				email,
				groups: [groupId],
				status: 'active' // 'active' for double opt-in disabled
			})
		});

		const data = await mlResponse.json();

		if (!mlResponse.ok) {
			console.error('MailerLite API error:', data);

			// Handle specific MailerLite errors
			if (mlResponse.status === 422 && data.message?.includes('already exists')) {
				return new Response(JSON.stringify({ error: 'This email is already subscribed' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			return new Response(
				JSON.stringify({ error: data.message || 'Failed to subscribe' }),
				{
					status: mlResponse.status,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Success!
		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Form submission error:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
