import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRJw3PyOjkmcVVjKxItQB7qa75RA6Z0hM",
  authDomain: "adventuresacesclub.firebaseapp.com",
  projectId: "adventuresacesclub",
  storageBucket: "adventuresacesclub.firebasestorage.app",
  messagingSenderId: "1017011729372",
  appId: "1:1017011729372:web:3514640408ec101f991519",
  measurementId: "G-687NLPDK9L"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 