// Code credits: https://blog.logrocket.com/user-authentication-firebase-react-apps/

import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    doc,
    addDoc,
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "better-ab01d.firebaseapp.com",
    projectId: "better-ab01d",
    storageBucket: "better-ab01d.appspot.com",
    messagingSenderId: "962019626621",
    appId: "1:962019626621:web:007cf65e64c051f7a3eb14",
    measurementId: "G-1R7TRZVT73",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        throw err.message;
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            uid: user.uid,
            email,
            loginStreak: 1,
            lastLogin: new Date().toLocaleDateString(),
        });
        await setDoc(doc(db, "goals", user.uid), {
            goalArray: [],
        });
        await setDoc(doc(db, "data", user.uid), {
            dataArray: [],
        });
    } catch (err) {
        console.error(err);
        throw err.message;
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        throw err.message;
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
