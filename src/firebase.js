// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , getAuth, onAuthStateChanged , signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage , ref, uploadBytes } from 'firebase/storage';
import { useState , useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth();
const storage = getStorage();

export function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password){
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    signOut(auth);
}

//Customm hook
export function useAuth() {
    const [currentUser,setCurrentUser] = useState();
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    
      return unsub;
    }, [])
    
    return currentUser;
}

//Storage
export async function upload(file, currentUser, setLoading) {
    // const fileRef = ref(storage, fileLocation);
    const fileRef = ref(storage, 'images/' + currentUser.uid + '.png');
    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);

    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, {photoURL});

    setLoading(false);
    alert("Uploaded file!");
}