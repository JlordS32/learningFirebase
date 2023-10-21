// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMH88XQ2eJSxVd4COcCaLUAHpjU6WfETU",
  authDomain: "todo-app-2-7d155.firebaseapp.com",
  projectId: "todo-app-2-7d155",
  storageBucket: "todo-app-2-7d155.appspot.com",
  messagingSenderId: "833428704925",
  appId: "1:833428704925:web:6d5b8fe28f71ec52d58e74",
  measurementId: "G-M5Z54FT6WQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);