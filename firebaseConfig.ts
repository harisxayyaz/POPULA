// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP5pvGSso9v_NZslr86CoHdArJ-bc_Q00",
  authDomain: "popula-13e64.firebaseapp.com",
  projectId: "popula-13e64",
  storageBucket: "popula-13e64.firebasestorage.app",
  messagingSenderId: "198261189436",
  appId: "1:198261189436:web:c4b10abcb663c88bac8c39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };