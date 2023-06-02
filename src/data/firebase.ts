// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
import {getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEHrW6ySQJv3mcNtdT4VtRs6iMK89G6n4",
  authDomain: "nescatweb.firebaseapp.com",
  projectId: "nescatweb",
  storageBucket: "nescatweb.appspot.com",
  messagingSenderId: "99684911871",
  appId: "1:99684911871:web:743d55b4a1fa34df69daca",
  measurementId: "G-T4CR9VGEJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)
console.log(db)