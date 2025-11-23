import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log("Loading Firebase config...");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Log all config values (except sensitive info like passwords)
console.log("Firebase config loaded:", {
  apiKey: firebaseConfig.apiKey?.slice(0, 5) + "...",
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
});

// Prevent double initialization
const app = !getApps().length
  ? (() => {
      console.log("Initializing Firebase app...");
      return initializeApp(firebaseConfig);
    })()
  : (() => {
      console.log("Firebase app already initialized, using existing app.");
      return getApp();
    })();

export const auth = getAuth(app);
console.log("Firebase auth initialized:", auth);
