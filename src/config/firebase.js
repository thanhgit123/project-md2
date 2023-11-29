// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8W3TlVJnmql0S8bSitlLIOD6BiaHSuxA",
  authDomain: "projectmd2-d11df.firebaseapp.com",
  projectId: "projectmd2-d11df",
  storageBucket: "projectmd2-d11df.appspot.com",
  messagingSenderId: "1072093871589",
  appId: "1:1072093871589:web:b1015a98c5f87e65b8430c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)