// src/backend/login.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";  // Import auth from firebase.js

const signIn = async (email, password) => {
  try {
    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Sign-in successful:", userCredential.user);
    return userCredential; // Return userCredential to handle success in the component
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);  // Throw the error to handle in the component
  }
};

export { signIn };
