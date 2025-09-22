import 'server-only';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

// This file is now correctly guarded with 'server-only' and will not be included in Edge bundles.
if (!admin.apps.length) {
  try {
    // In a real production app, you would use admin.credential.cert() or applicationDefault()
    admin.initializeApp({
      credential: applicationDefault(),
      projectId: "studio-5054979338-10033",
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const authAdmin = admin.auth();
