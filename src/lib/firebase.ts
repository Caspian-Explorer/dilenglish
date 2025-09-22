import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-5054979338-10033",
  "appId": "1:119684693002:web:e36f24b30de5ab7743f3f3",
  "apiKey": "AIzaSyAiFQ5oq6DDdBohdCWLHRzLOnTTVmEVnLk",
  "authDomain": "studio-5054979338-10033.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "119684693002"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
