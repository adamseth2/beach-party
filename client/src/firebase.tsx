import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  authDomain: 'beach-party-cleanup.firebaseapp.com',
  projectId: 'beach-party-cleanup',
  storageBucket: 'beach-party-cleanup.appspot.com',
  messagingSenderId: '602011093873',
  appId: '1:602011093873:web:91b7384f93a814e4b604d0',
  measurementId: 'G-06DZWH68LX',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
