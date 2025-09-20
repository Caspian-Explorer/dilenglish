import 'server-only';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const authAdmin = admin.auth();
