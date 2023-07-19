import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBp1GBpOjLTUVZNA12bc8HeJzaVREdYuD0",
  authDomain: "project-fintech-c29d3.firebaseapp.com",
  projectId: "project-fintech-c29d3",
  storageBucket: "project-fintech-c29d3.appspot.com",
  messagingSenderId: "717110448677",
  appId: "1:717110448677:web:e4f0fffc2b04806bd665cc",
  measurementId: "G-6E60VPTB2F",
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

// const firebase = require('firebase');
// const firebaseui = require('firebaseui');

// const initializeFirebaseApp = () => {
//   const ui = new firebaseui.auth.AuthUI(firebase.auth());
// }

// export default {
//   firebaseApp,
//   firebaseAuth,
//   firebaseFirestore,
// };
