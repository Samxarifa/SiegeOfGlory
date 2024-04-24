import { type RequestEvent } from '@sveltejs/kit';
import webpush from 'web-push';
import { env as envPrivate } from '$env/dynamic/private';
import { env as envPublic } from '$env/dynamic/public';

webpush.setVapidDetails(
	'mailto:samuelhay9@gmail.com',
	envPublic.PUBLIC_NOTIF_KEY,
	envPrivate.PRIVATE_NOTIF_KEY
);

const subscriptions: webpush.PushSubscription[] = [];

export async function POST(request: RequestEvent) {
	const subscription: webpush.PushSubscription = await request.request.json();
	console.log(subscription);
	// Save Subscription
	subscriptions.push(subscription);

	return new Response('Subscription saved');
}

export async function GET() {
	console.log(subscriptions);
	subscriptions.forEach(async (subscription) => {
		try {
			await webpush.sendNotification(subscription, 'Hello World');
		} catch (error) {
			console.error('Error sending notification', error);
		}
	});
	return new Response('Notifications sent');
}
