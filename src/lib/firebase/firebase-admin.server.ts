import admin from 'firebase-admin';
import { env } from '$env/dynamic/private';

let firebaseAdmin: admin.app.App;

if (admin.apps[0]) {
	// If admin app exists already, uses it rather than declaring new one
	firebaseAdmin = admin.apps[0];
} else {
	// If no admin app exists, declares one
	firebaseAdmin = admin.initializeApp({
		credential: admin.credential.cert(JSON.parse(env.FIREBASE_KEY))
	});
}

export const adminAuth = firebaseAdmin.auth();
