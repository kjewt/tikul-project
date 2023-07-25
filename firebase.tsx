import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, where, getDocs, doc, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApB3MMgBUOgg-Vq_a8q9GPDgMPC2aReI0",
  authDomain: "tikul-project.firebaseapp.com",
  projectId: "tikul-project",
  storageBucket: "tikul-project.appspot.com",
  messagingSenderId: "1007281077741",
  appId: "1:1007281077741:web:5b6442989cce1a157d3be4"
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
// export const fetchFirestoreUserData = async (userId: string) => {
//   try {
//     const usersRef = collection(db, 'users');
//     const userDoc = await doc(usersRef, userId).get();

//     if (userDoc.exists()) {
//       const userData = userDoc.data();
//       console.log('회원 데이터를 가져왔습니다.:', userData);
//       return userData;
//     } else {
//       console.log('주어진 데이터와 일치하는 user.uid가 없습니다.');
//       return null;
//     }
//   } catch (error) {
//     console.error('회원 데이터를 가져오지 못 했습니다.:', error);
//     return null;
//   }
// };
