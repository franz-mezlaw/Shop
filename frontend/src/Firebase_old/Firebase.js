// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAC6qPCdRKl8XqyxFmr6we4SK7wFpbOOWM",
    authDomain: "hotel-shop-2e1bc.firebaseapp.com",
    projectId: "hotel-shop-2e1bc",
    storageBucket: "hotel-shop-2e1bc.appspot.com",
    messagingSenderId: "1080594453300",
    appId: "1:1080594453300:web:db597efce92a0024368b61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();