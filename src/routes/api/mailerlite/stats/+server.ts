import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async () => {
	try {
		// Check if API key is configured
		if (!env.MAILERLITE_API_KEY) {
			console.warn('MAILERLITE_API_KEY not configured, using fallback count');
			return json({ count: 528 }, { status: 200 });
		}

		// Fetch subscriber count filtered by active status
		// limit=0 returns only the total count without subscriber data
		const response = await fetch(
			'https://connect.mailerlite.com/api/subscribers?filter[status]=active&limit=0',
			{
				headers: {
					Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
					Accept: 'application/json'
				}
			}
		);

		if (!response.ok) {
			console.error('MailerLite API error:', response.status, response.statusText);
			throw new Error('Failed to fetch subscriber count');
		}

		const data = await response.json();

		// Return the total count from MailerLite, fallback to 528 if not present
		return json({
			count: data.total || 528
		});
	} catch (error) {
		console.error('Error fetching subscriber count:', error);
		// Graceful fallback - return hardcoded value if API fails
		return json({ count: 528 }, { status: 200 });
	}
};
