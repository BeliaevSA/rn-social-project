import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWu_7E1REeeKeKIsH7beNtCygVtFXMJbk",
  authDomain: "rn-social-app-87d9d.firebaseapp.com",
  databaseURL: "https://rn-social-app-87d9d.firebaseio.com",
  projectId: "rn-social-app-87d9d",
  storageBucket: "rn-social-app-87d9d.appspot.com",
  messagingSenderId: "617013934352",
  appId: "1:617013934352:web:1e2dd771c9384187108d95",
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
