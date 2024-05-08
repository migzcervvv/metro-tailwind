// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // Import ref and onValue functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "metrobreathe-may8.firebaseapp.com",
  databaseURL:
    "https://metrobreathe-may8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "metrobreathe-may8",
  storageBucket: "metrobreathe-may8.appspot.com",
  messagingSenderId: "848600402692",
  appId: "1:848600402692:web:f63a81fcf968db7e739e51",
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
