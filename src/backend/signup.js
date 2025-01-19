import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../backend/firebase"; // Import firebase auth

export const signUp = async (email, password) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    console.log("User created successfully:", user); // You can remove this after successful testing

  } catch (error) {
    console.error("Error signing up:", error.message); // Handle error
    throw new Error(error.message); // Pass error message to be displayed in the component
  }
};
