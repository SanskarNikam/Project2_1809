// Import the functions you need from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoueQslUH02o0uy3FnAP9UWpneAJZGqbI",
  authDomain: "project2-1809.firebaseapp.com",
  projectId: "project2-1809",
  storageBucket: "project2-1809.firebasestorage.app",
  messagingSenderId: "585823739680",
  appId: "1:585823739680:web:c534dadfc5571c0438c145",
  measurementId: "G-P0PNGFGQQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Optional: Initialize Analytics (if you want to use it)
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Optional: Request permission for notifications and get FCM token
const requestPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
    console.log("FCM Token:", token); // Use this token to send notifications
  } catch (error) {
    console.error("Error requesting permission or getting token:", error);
  }
};

// Export Firebase services and functions
export {
  app,
  auth,
  db,
  messaging,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  requestPermission, // Export requestPermission for use in other parts of the app
};
