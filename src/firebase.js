import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAQQsADaeYe0MYAmZXK3tJHQzKFbjB5IWs",
  authDomain: "renew-755e8.firebaseapp.com",
  projectId: "renew-755e8",
  storageBucket: "renew-755e8.firebasestorage.app",
  messagingSenderId: "851425224161",
  appId: "1:851425224161:web:9d1481cc0e6750b9345ea0",
  measurementId: "G-M9QSQQ3YM1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };