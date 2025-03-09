import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIDBpDgjqpN5tupiUHIl6cYqTBBMw0c8E",
  authDomain: "pro-type-441fd.firebaseapp.com",
  projectId: "pro-type-441fd",
  storageBucket: "pro-type-441fd.appspot.com",
  messagingSenderId: "571165271978",
  appId: "1:571165271978:web:63619bafc07c55c6242dd3",
  measurementId: "G-XF4CB550TD",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
