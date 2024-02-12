import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDQsHQ-uzIHYI5Y19pqQ-gZby6NZJQ_D54',
	authDomain: 'siegeofglory.firebaseapp.com',
	projectId: 'siegeofglory',
	storageBucket: 'siegeofglory.appspot.com',
	messagingSenderId: '517665636783',
	appId: '1:517665636783:web:c146cf3ad694b77456ef5a'
};

let app: FirebaseApp;

if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);

	setInterval(
		async () => {
			if (auth.currentUser) {
				console.log('Token Refresh');
				const token = await auth.currentUser.getIdToken(true);
				await fetch('/api/auth', {
					method: 'POST',
					body: JSON.stringify({ token: token })
				});
			}
		},
		5 * 60 * 1000
	);
} else {
	app = getApp();
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
