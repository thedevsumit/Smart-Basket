
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
    apiKey: "AIzaSyAEwYrgCYARokEFG3ZfIZkIA3cqe-XPU3A",
    authDomain: "smartbasket-demo.firebaseapp.com",
    projectId: "smartbasket-demo",
    storageBucket: "smartbasket-demo.firebasestorage.app",
    messagingSenderId: "849172016696",
    appId: "1:849172016696:web:a9d430f7474d2ff80440cd",
    measurementId: "G-XD4HBGVJ95"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;

