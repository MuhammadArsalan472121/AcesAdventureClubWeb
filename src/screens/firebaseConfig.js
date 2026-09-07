import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRJw3PyOjkmcVVjKxItQB7qa75RA6Z0hM",
  authDomain: "adventuresacesclub.firebaseapp.com",
  projectId: "adventuresacesclub",
  storageBucket: "adventuresacesclub.firebasestorage.app",
  messagingSenderId: "1017011729372",
  appId: "1:1017011729372:web:3514640408ec101f991519",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app; 