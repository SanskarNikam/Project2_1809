// notificationService.js
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { db } from '../backend/firebase'; // Ensure you import your Firebase setup correctly
import { collection, doc, setDoc } from "firebase/firestore";

// Request permission for push notifications
export const requestNotificationPermission = async (user) => {
  const messaging = getMessaging();
  try {
    const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }); // Add your VAPID key
    if (token) {
      // Store the token in the database to send notifications later
      await setDoc(doc(db, "users", user.uid), { token });
      console.log("Notification token saved:", token);
    } else {
      console.log("No notification token available");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

// Listen for incoming notifications (on the client side)
export const listenForNotifications = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Customize notification handling (e.g., show in-app alert)
  });
};

// Send a notification (this is for your backend or Firebase functions)
export const sendNotification = async (userId, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: userId, // Replace with the user's notification token
  };

  try {
    // Send notification using Firebase functions (server-side)
    // You may need to implement Firebase Cloud Functions for sending notifications
    console.log("Notification sent:", message);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
