import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaWhatsapp, FaTimes, FaPlus } from 'react-icons/fa';
import styles from './FloatingActions.module.css';

const FloatingActions = () => {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        {
            icon: <FaPhone />,
            label: 'Call Us',
            color: '#1B5E20',
            action: () => window.location.href = 'tel:+2348066306125'
        },
        {
            icon: <FaWhatsapp />,
            label: 'WhatsApp',
            color: '#25D366',
            action: () => window.open('https://wa.me/2348066306125', '_blank')
        },
        {
            icon: <FaCalendarAlt />,
            label: 'Book Now',
            color: '#d4a574',
            action: () => {
                const section = document.getElementById('section6');
                section?.scrollIntoView({ behavior: 'smooth' });
            }
        },
        {
            icon: <FaMapMarkerAlt />,
            label: 'Location',
            color: '#D32F2F',
            action: () => window.open('https://www.google.com/maps/search/?api=1&query=Bee+Heaven+Beauty+Spa+7+Adebare+Street+Ogudu', '_blank')
        }
    ];

    return (
        <div className={styles.floatingActions}>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {actions.map((action, index) => (
                            <motion.button
                                key={index}
                                className={styles.actionButton}
                                style={{ backgroundColor: action.color }}
                                initial={{ scale: 0, y: 0 }}
                                animate={{
                                    scale: 1,
                                    y: -(index + 1) * 70
                                }}
                                exit={{ scale: 0, y: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20,
                                    delay: index * 0.05
                                }}
                                onClick={() => {
                                    action.action();
                                    setIsOpen(false);
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {action.icon}
                                <span className={styles.tooltip}>{action.label}</span>
                            </motion.button>
                        ))}
                    </>
                )}
            </AnimatePresence>

            <motion.button
                className={styles.mainButton}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                {isOpen ? <FaTimes /> : <FaPlus />}
            </motion.button>
        </div>
    );
};

export default FloatingActions;
