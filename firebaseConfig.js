import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fir-b046e.firebaseapp.com",
  projectId: "fir-b046e",
  storageBucket: "fir-b046e.appspot.com",
  messagingSenderId: "295166923409",
  appId: "1:295166923409:web:a7784668328c1741bd2530",
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);
