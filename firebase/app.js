// import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
// import { } from 'firebase/auth';
import { } from 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase

// const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);


export default firebase