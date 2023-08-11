// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGC2EnhdKfzRCjeDJfPHCxP20U9LSuYr8",
  authDomain: "cloneapps-a6f1e.firebaseapp.com",
  projectId: "cloneapps-a6f1e",
  storageBucket: "cloneapps-a6f1e.appspot.com",
  messagingSenderId: "192980313119",
  appId: "1:192980313119:web:77fbf25059188f3b36a12a",
  measurementId: "G-Z45EXN5TEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
