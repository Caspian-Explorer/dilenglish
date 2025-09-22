'server-only';

import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { firebaseConfig } from './firebase';

let adminAuth: Auth;

if (process.env.NODE_ENV === 'development') {
    // In development, use the default service account credentials
    if (!getApps().length) {
        initializeApp({
            projectId: firebaseConfig.projectId,
        });
    }
    adminAuth = getAuth();
} else {
    // In production, use the service account JSON from the environment variable
    if (!getApps().length) {
        const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!);
        initializeApp({
            credential: cert(serviceAccount),
            projectId: firebaseConfig.projectId,
        });
    }
    adminAuth = getAuth();
}


export { adminAuth };
