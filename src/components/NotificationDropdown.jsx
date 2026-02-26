import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Check, Trash2, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function NotificationDropdown() {
    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'notifications'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notifs = [];
            let unread = 0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                notifs.push({ id: doc.id, ...data });
                if (!data.read) {
                    unread += 1;
                }
            });
            setNotifications(notifs);
            setUnreadCount(unread);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const markAsRead = async (notificationId) => {
        try {
            await updateDoc(doc(db, 'notifications', notificationId), {
                read: true
            });
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await deleteDoc(doc(db, 'notifications', notificationId));
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case 'info':
            default:
                return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 rounded-full"
            >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 block w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full text-center leading-none flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                        <span className="text-xs text-gray-500">{unreadCount} unread</span>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">
                            No notifications right now.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`px-4 py-3 hover:bg-gray-50 flex items-start ${!notification.read ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex-shrink-0 pt-0.5">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                        <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                            {notification.title}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {notification.createdAt ? new Date(notification.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex flex-col items-center space-y-2">
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-gray-400 hover:text-green-500"
                                                title="Mark as read"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-gray-400 hover:text-red-500"
                                            title="Delete notification"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
