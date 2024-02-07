import admin from 'firebase-admin';
import { FIREBASE_KEY } from '$env/static/private';

let firebaseAdmin: admin.app.App;

if (admin.apps[0]) {
	firebaseAdmin = admin.apps[0];
} else {
	firebaseAdmin = admin.initializeApp({
		credential: admin.credential.cert(JSON.parse(FIREBASE_KEY))
	});
}

export const adminAuth = firebaseAdmin.auth();
