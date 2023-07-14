// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD37MacPCguQIVD-EJwVXD4IAIfN36sgYc",
  authDomain: "portfolio-b6f48.firebaseapp.com",
  projectId: "portfolio-b6f48",
  storageBucket: "portfolio-b6f48.appspot.com",
  messagingSenderId: "433508860499",
  appId: "1:433508860499:web:7bd0237d86009d898e7ca6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
