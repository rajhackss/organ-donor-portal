import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Sends a notification to a specific user.
 * 
 * @param {string} userId - The ID of the user receiving the notification.
 * @param {string} title - The title of the notification.
 * @param {string} message - The main content of the notification.
 * @param {string} type - The type of notification: 'info', 'success', 'warning'. Defaults to 'info'.
 */
export const sendNotification = async (userId, title, message, type = 'info') => {
    try {
        await addDoc(collection(db, 'notifications'), {
            userId,
            title,
            message,
            type,
            read: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};
