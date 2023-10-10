// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMVWZ8DAuCQ0xR_EHpaNuJgjfpLBZaZAk",
  authDomain: "myawesometest-35a2f.firebaseapp.com",
  projectId: "myawesometest-35a2f",
  storageBucket: "myawesometest-35a2f.appspot.com",
  messagingSenderId: "1044947026905",
  appId: "1:1044947026905:web:79cd0a4d645588502f0fc8",
  measurementId: "G-S64M688GR8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFireStore(app);
const analytics = getAnalytics(app);