// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjbOZaivQaWV6QdzvDAm9Kw44p_rrfipY",
  authDomain: "instagram-reels-app-85fa1.firebaseapp.com",
  projectId: "instagram-reels-app-85fa1",
  storageBucket: "instagram-reels-app-85fa1.appspot.com",
  messagingSenderId: "225794364484",
  appId: "1:225794364484:web:68604cd0edea3e05675811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export {auth, storage, db}
export default app;