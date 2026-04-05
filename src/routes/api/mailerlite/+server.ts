import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, platform }) => {
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
		if (!env.MAILERLITE_API_KEY) {
			console.error('MAILERLITE_API_KEY is not configured');
			return json({ error: 'Server configuration error' }, { status: 500 });
		}

		// Extract user's IP address and country from Cloudflare platform
		// When deployed to Cloudflare Pages, platform.cf contains request metadata
		// Fallback to headers for local development or non-Cloudflare environments
		const ip =
			(platform?.cf as { connectingIp?: string })?.connectingIp || // Cloudflare platform (production)
			request.headers.get('cf-connecting-ip') || // Header fallback
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			null;

		const country = platform?.cf?.country || null; // Direct country from Cloudflare (available on all plans)

		// Submit to MailerLite API
		const requestBody: {
			email: string;
			status: string;
			groups: string[];
			ip_address?: string;
			fields?: {
				country?: string;
			};
		} = {
			email,
			status: 'active', // Mark subscriber as active (bypasses double opt-in)
			groups: [env.GROUP_ID] // Add subscriber to the main group (non-vip)
		};

		// Include IP address if available (MailerLite will use this to determine location)
		if (ip) {
			requestBody.ip_address = ip;
		}

		// Include country field if available (direct from Cloudflare)
		if (country) {
			requestBody.fields = {
				country: country
			};
		}

		const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
				Accept: 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

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
