// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo5cgA_xOB6lLNfAp6hfy5KUAN6mTrbjc",
  authDomain: "pollingapp-554a8.firebaseapp.com",
  projectId: "pollingapp-554a8",
  storageBucket: "pollingapp-554a8.firebasestorage.app",
  messagingSenderId: "258120660112",
  appId: "1:258120660112:web:22a76745086276d9505415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth()
export default app;
