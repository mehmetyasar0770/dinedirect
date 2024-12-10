import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyDvuSXV4YfsNPD7nGv54O145owY5vkm08c",
    authDomain: "dinedirect-22d97.firebaseapp.com",
    projectId: "dinedirect-22d97",
    storageBucket: "dinedirect-22d97.firebasestorage.app",
    messagingSenderId: "556479502125",
    appId: "1:556479502125:web:e21f0a25bab17025c7e5a4",
    measurementId: "G-9EVCSX3R53"
};
const app = initializeApp (firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore(app);