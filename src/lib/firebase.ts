import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: "studio-5054979338-10033",
  appId: "1:119684693002:web:e36f24b30de5ab7743f3f3",
  apiKey: "AIzaSyAiFQ5oq6DDdBohdCWLHRzLOnTTVmEVnLk",
  authDomain: "studio-5054979338-10033.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "119684693002"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
