import { useState, useEffect, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Send, X, MessageCircle } from 'lucide-react';
import { sendNotification } from '../lib/notifications';

export default function ChatWindow({ recipientId, recipientName, onClose }) {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Generate a consistent chatId for these two users
    const chatId = currentUser.uid < recipientId
        ? `${currentUser.uid}_${recipientId}`
        : `${recipientId}_${currentUser.uid}`;

    useEffect(() => {
        if (!currentUser || !recipientId) return;

        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = [];
            snapshot.forEach((doc) => {
                fetchedMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [chatId, currentUser, recipientId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;

        try {
            const messagesRef = collection(db, 'chats', chatId, 'messages');
            await addDoc(messagesRef, {
                text: newMessage,
                senderId: currentUser.uid,
                createdAt: serverTimestamp()
            });

            // Send Notification to recipient
            const title = `New message from ${currentUser.displayName || currentUser.email}`;
            const notificationMessage = newMessage.length > 50 ? `${newMessage.substring(0, 47)}...` : newMessage;
            await sendNotification(recipientId, title, notificationMessage, 'info');

            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="fixed bottom-0 right-0 sm:right-6 sm:bottom-6 w-full sm:w-80 sm:rounded-t-lg bg-white shadow-2xl border border-gray-200 z-50 flex flex-col h-96 sm:h-auto sm:max-h-96">
            {/* Header */}
            <div className="bg-rose-600 px-4 py-3 flex justify-between items-center sm:rounded-t-lg">
                <div className="flex items-center text-white">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold text-sm truncate max-w-[200px]">{recipientName}</span>
                </div>
                <button onClick={onClose} className="text-rose-100 hover:text-white focus:outline-none">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-3 min-h-[250px] max-h-[300px]">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm mt-10">
                        No messages yet. Say hello!
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMine = msg.senderId === currentUser.uid;
                        return (
                            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-lg px-4 py-2 text-sm ${isMine ? 'bg-rose-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-900 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none disabled:bg-rose-400"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
