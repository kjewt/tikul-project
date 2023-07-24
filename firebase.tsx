import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBpkxfL2gb50ccmdq5DRzySsGKGk41wBW4",
  authDomain: "tikul-2023.firebaseapp.com",
  projectId: "tikul-2023",
  storageBucket: "tikul-2023.appspot.com",
  messagingSenderId: "805310369374",
  appId: "1:805310369374:web:dc508a81072de3d33b2ecf",
  measurementId: "G-ZZXWPEP6CE"
};

// apiKey: import.meta.env.VITE_API_KEY,
// authDomain: import.meta.env.VITE_AUTH_DOMAIN,
// projectId: import.meta.env.VITE_PROJECT_ID,
// storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
// messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
// appId: import.meta.env.VITE_APP_ID,
// measurementId: import.meta.env.VITE_MEASUREMENT_ID,


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);



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
