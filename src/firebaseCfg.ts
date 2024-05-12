// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXbbRvxku2RhLiHde2OWas7T5SaYQ5lcQ",
    authDomain: "tasklistapp-a6f81.firebaseapp.com",
    projectId: "tasklistapp-a6f81",
    storageBucket: "tasklistapp-a6f81.appspot.com",
    messagingSenderId: "645351903607",
    appId: "1:645351903607:web:76f1a82af1b1acad035172"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Try to log in user and return message about success or error
export async function loginUser(email: string, password: string){
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return {answer: true, message: "Login successful"};
    } catch(error) {
        console.log("Problem", error);
        return {answer: false, message: error.code};
    }
}

// Try to register user and return success/failure boolean
export async function registerUser(email: string, password: string){
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function signUserOut(){
    return await signOut(auth);
}

export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(auth, function(user) {
            if(user){
                resolve(user);   
            }
            else {
                resolve(null);
            }
            unsub();
        })
    })
    
}
