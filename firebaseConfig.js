// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // Import ref and onValue functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "metrobreathe-test.firebaseapp.com",
  databaseURL:
    "https://metrobreathe-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "metrobreathe-test",
  storageBucket: "metrobreathe-test.appspot.com",
  messagingSenderId: "330716473738",
  appId: "1:330716473738:web:dd3beec4f1d66b55010073",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch data from Firebase Realtime Database
export const fetchDataFromFirebase = () => {
  const rootRef = ref(database, "/"); // The actual path in database
  return new Promise((resolve, reject) => {
    onValue(
      rootRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
