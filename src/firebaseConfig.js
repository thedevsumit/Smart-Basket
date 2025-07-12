
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyAPtgUrrJz7Ei0oNx8c2GC5ULpfPAbbAL0",
  authDomain: "smart-basket-auth.firebaseapp.com",
  projectId: "smart-basket-auth",
  storageBucket: "smart-basket-auth.firebasestorage.app",
  messagingSenderId: "630611314545",
  appId: "1:630611314545:web:ab4f2bf5ee67fcd4e9d8d0",
  measurementId: "G-6VVF51LZJ1"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;

