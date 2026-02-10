import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCC_yNisi-DWUWorVF_hS3mPU5OkVlRmm8",
  authDomain: "syntaxa-ed936.firebaseapp.com",
  projectId: "syntaxa-ed936",
  storageBucket: "syntaxa-ed936.firebasestorage.app",
  messagingSenderId: "579378637353",
  appId: "1:579378637353:web:e9cf71bcff1378b2e34a38",
  measurementId: "G-FFRW01MN2T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };