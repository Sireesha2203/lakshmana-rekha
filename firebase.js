// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9LDcg2zTweyWXzqC0Mrj_pA7XqgUuotM",
  authDomain: "lakshmana-rekha.firebaseapp.com",
  projectId: "lakshmana-rekha",
  storageBucket: "lakshmana-rekha.appspot.com",
  messagingSenderId: "309917158057",
  appId: "1:309917158057:web:727a7ac037f3e000e237b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();