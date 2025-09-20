import 'server-only';
import admin from 'firebase-admin';

// This file is now correctly guarded with 'server-only' and will not be included in Edge bundles.
if (!admin.apps.length) {
  try {
    // We are not using service account credentials here for simplicity in this environment.
    // In a real production app, you would use admin.credential.cert() or applicationDefault()
    admin.initializeApp({
      projectId: 'studio-5054979338-10033',
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const authAdmin = admin.auth();
