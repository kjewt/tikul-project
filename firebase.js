import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: vite.env.d.ts.VITE_API_KEY,
  authDomain: vite.env.d.ts.VITE_AUTH_DOMAIN,
  projectId: vite.env.d.ts.VITE_PROJECT_ID,
  storageBucket: vite.env.d.ts.VITE_STORAGE_BUCKET,
  messagingSenderId: vite.env.d.ts.VITE_MESSAGING_SENDER_ID,
  appId: vite.env.d.ts.VITE_APP_ID,
  measurementId: vite.env.d.ts.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
//
// 꼭 이렇게 해야하는 건 아니니까 편한대로 해당 스크립트에서 import해서 사용해도 된다
export {
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
