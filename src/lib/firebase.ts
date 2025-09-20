import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'studio-5054979338-10033',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:119684693002:web:e36f24b30de5ab7743f3f3',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAiFQ5oq6DDdBohdCWLHRzLOnTTVmEVnLk',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'studio-5054979338-10033.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '119684693002',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
