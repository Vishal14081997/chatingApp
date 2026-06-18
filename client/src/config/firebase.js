import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDKYpfJAy1WvGfmtHohf7UvrTKmU0KiJKc",
    authDomain: "chatingapp-4e849.firebaseapp.com",
    projectId: "chatingapp-4e849",
    storageBucket: "chatingapp-4e849.firebasestorage.app",
    messagingSenderId: "723393509578",
    appId: "1:723393509578:web:e14e50928306f3f0955c33",
    measurementId: "G-NPYG1HFEML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// console.log(auth);

const googleProvider = new GoogleAuthProvider();
// console.log(googleProvider);

export const signInWithGoogle = async () => {
    const googleUser = await signInWithPopup(auth, googleProvider)
    console.log("googleUser", googleUser);
    return googleUser.user;
}
