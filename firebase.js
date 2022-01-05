// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4u2YxblGbKFvhz7aaCIFawmZOfnmyhIg",
  authDomain: "photo-297c7.firebaseapp.com",
  projectId: "photo-297c7",
  storageBucket: "photo-297c7.appspot.com",
  messagingSenderId: "811493094788",
  appId: "1:811493094788:web:0389c5224af31b473159d1"
};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}