
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCmD21alOHdRN7hQ99AMCgf5HNQISWIhY0",
  authDomain: "agrow-auth.firebaseapp.com",
  projectId: "agrow-auth",
  storageBucket: "agrow-auth.appspot.com",
  messagingSenderId: "963733973633",
  appId: "1:963733973633:web:cf8a6d88a0f349e80bbb80",
  measurementId: "G-1T2XTPDJ0D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db=getFirestore(app);
export {app,auth,db};