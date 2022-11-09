import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
