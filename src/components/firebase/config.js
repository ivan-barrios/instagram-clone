// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJJmVxinw3yr5HvxvGF0VVZr5rLMgyQTY",
  authDomain: "instagram-clone-aeb74.firebaseapp.com",
  projectId: "instagram-clone-aeb74",
  storageBucket: "instagram-clone-aeb74.appspot.com",
  messagingSenderId: "666558068909",
  appId: "1:666558068909:web:87df5e4aa4f15d575e6e24",
  measurementId: "G-FR2VS7DMKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
