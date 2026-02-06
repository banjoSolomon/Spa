import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaComments } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LiveChat.module.css';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const quickMessages = [
        "I'd like to book an appointment",
        "What are your prices?",
        "What services do you offer?",
        "What are your working hours?"
    ];

    const handleSendMessage = (msg) => {
        const phoneNumber = "2348066306125";
        const text = encodeURIComponent(msg || message);
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.chatWindow}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.chatHeader}>
                            <div className={styles.headerContent}>
                                <FaWhatsapp className={styles.whatsappIcon} />
                                <div>
                                    <h3>Chat with us</h3>
                                    <p>We typically reply instantly</p>
                                </div>
                            </div>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className={styles.chatBody}>
                            <div className={styles.welcomeMessage}>
                                <p>👋 Hi there! How can we help you today?</p>
                            </div>

                            <div className={styles.quickReplies}>
                                <p className={styles.quickRepliesLabel}>Quick replies:</p>
                                {quickMessages.map((msg, index) => (
                                    <button
                                        key={index}
                                        className={styles.quickReply}
                                        onClick={() => handleSendMessage(msg)}
                                    >
                                        {msg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.chatFooter}>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                className={styles.messageInput}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={() => handleSendMessage()}
                                disabled={!message.trim()}
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={styles.chatButton}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open chat"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <FaTimes />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <FaComments />
                        </motion.div>
                    )}
                </AnimatePresence>
                <span className={styles.badge}>1</span>
            </motion.button>
        </>
    );
};

export default LiveChat;
