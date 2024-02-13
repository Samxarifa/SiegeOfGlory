import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// Config details for firebase module to connect to cloud
const firebaseConfig = {
	apiKey: 'AIzaSyDQsHQ-uzIHYI5Y19pqQ-gZby6NZJQ_D54',
	authDomain: 'siegeofglory.firebaseapp.com',
	projectId: 'siegeofglory',
	storageBucket: 'siegeofglory.appspot.com',
	messagingSenderId: '517665636783',
	appId: '1:517665636783:web:c146cf3ad694b77456ef5a'
};

let app: FirebaseApp;

// Declares new app if no app already used
if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);

	// Refreshes firebase token and sends it to auth endpoint every 10 mins (stop it expiring)
	setInterval(
		async () => {
			if (auth.currentUser) {
				// console.log('Token Refresh');
				const token = await auth.currentUser.getIdToken(true);
				await fetch('/api/auth', {
					method: 'POST',
					body: JSON.stringify({ token: token })
				});
			}
		},
		10 * 60 * 1000
	);
} else {
	// Gets app, if already exists
	app = getApp();
}

// Returns auth section of app and googleAuth for login with google prompt
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
