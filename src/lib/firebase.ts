import { initializeApp } from 'firebase/app';
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
