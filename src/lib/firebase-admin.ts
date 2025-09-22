'server-only';

import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let app: App;

if (getApps().length === 0) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        app = initializeApp({
            credential: cert(serviceAccount)
        });
    } else {
        // This is for local development and CI/CD environments
        app = initializeApp();
    }
} else {
    app = getApps()[0];
}

const adminAuth = getAuth(app);

export { adminAuth };
