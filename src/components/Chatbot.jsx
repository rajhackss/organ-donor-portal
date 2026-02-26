import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

// Hardcoded FAQ Responses
const faqKnowledgeBase = {
    registration: "To register, click on the 'Login' button at the top right and sign in with your Google account. You'll then be asked to complete your profile.",
    donate: "If you want to donate an organ, sign up and navigate to the Donor Dashboard. Fill out your medical details and set your status to Active.",
    receive: "To receive an organ, sign up and go to the Recipient Dashboard. Fill out the required details. You must be verified by an admin before you can contact donors.",
    verification: "All accounts are manually verified by our administrative team. This process usually takes 1-2 business days. We will notify you once verified.",
    cost: "The Donor Bridge platform is completely free to use. We do not charge any fees for connecting donors and recipients.",
    default: "I'm sorry, I couldn't quite understand that. I can help answer questions about registration, donating an organ, receiving an organ, or the verification process."
};

const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('create account')) {
        return faqKnowledgeBase.registration;
    } else if (lowerMessage.includes('donate') || lowerMessage.includes('give')) {
        return faqKnowledgeBase.donate;
    } else if (lowerMessage.includes('receive') || lowerMessage.includes('need') || lowerMessage.includes('get')) {
        return faqKnowledgeBase.receive;
    } else if (lowerMessage.includes('verify') || lowerMessage.includes('verification') || lowerMessage.includes('approve')) {
        return faqKnowledgeBase.verification;
    } else if (lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('price') || lowerMessage.includes('money')) {
        return faqKnowledgeBase.cost;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.includes('hey')) {
        return "Hello! I am the Donor Bridge Assistant. How can I help you today?";
    }

    return faqKnowledgeBase.default;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm the Donor Bridge virtual assistant. How can I help you today?", isBot: true }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now(), text: inputText, isBot: false };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = {
                id: Date.now(),
                text: getBotResponse(newUserMsg.text),
                isBot: true
            };
            setMessages(prev => [...prev, botResponse]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chatbot Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-rose-600 hover:bg-rose-700 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-transform transform hover:scale-105"
                >
                    <MessageSquare className="h-6 w-6" />
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="bg-white w-80 sm:w-96 rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden h-[500px]">
                    {/* Header */}
                    <div className="bg-rose-600 px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center text-white">
                            <Bot className="h-5 w-5 mr-2" />
                            <span className="font-semibold text-md">Virtual Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 focus:outline-none"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`flex max-w-[80%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-rose-100 mr-2' : 'bg-gray-200 ml-2'}`}>
                                        {msg.isBot ? <Bot className="h-5 w-5 text-rose-600" /> : <User className="h-5 w-5 text-gray-600" />}
                                    </div>
                                    <div className={`rounded-xl px-4 py-2 text-sm shadow-sm ${msg.isBot
                                        ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                        : 'bg-rose-600 text-white rounded-tr-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Field */}
                    <div className="p-3 bg-white border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none disabled:bg-rose-400"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
