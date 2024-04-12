import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

let app: FirebaseApp;

// Declares new app if no app already used
if (getApps().length === 0) {
	app = initializeApp(JSON.parse(env.PUBLIC_FIREBASE_CONFIG));
} else {
	// Gets app, if already exists
	app = getApp();
}

function createLoadingStore() {
	const { subscribe, set } = writable(true);

	return {
		subscribe,
		loading: () => set(true),
		loaded: () => set(false)
	};
}

// Returns auth section of app and googleAuth for login with google prompt
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
export const loading = createLoadingStore();
