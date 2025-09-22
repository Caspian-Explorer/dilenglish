'server-only';

import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { firebaseConfig } from './firebase';

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
  : {};

// This is the robust way to initialize the Firebase Admin SDK in a serverless environment.
const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
      projectId: firebaseConfig.projectId,
    })
  : getApps()[0];

const adminAuth = getAuth(app);

export { adminAuth };
