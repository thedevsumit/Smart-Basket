
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
    apiKey: "AIzaSyDC3IuA79Slc3O92ztmrgHcTjd2oXlmZ6I",
    authDomain: "testdemo-e043b.firebaseapp.com",
    projectId: "testdemo-e043b",
    storageBucket: "testdemo-e043b.firebasestorage.app",
    messagingSenderId: "1082699011655",
    appId: "1:1082699011655:web:c6350bc9bc838172774362",
    measurementId: "G-ZKBZP39R1X"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;

