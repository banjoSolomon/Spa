import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift } from 'react-icons/fa';
import styles from './PromoBanner.module.css';

const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasBeenClosed, setHasBeenClosed] = useState(false);

    useEffect(() => {
        const closed = localStorage.getItem('promoBannerClosed');
        if (closed) {
            setIsVisible(false);
            setHasBeenClosed(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('promoBannerClosed', 'true');
        setHasBeenClosed(true);
    };

    if (hasBeenClosed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.promoBanner}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.content}>
                        <FaGift className={styles.icon} />
                        <p className={styles.text}>
                            <strong>Special Offer!</strong> Get 20% off on all spa services this month. 
                            <span className={styles.cta} onClick={() => {
                                const section = document.getElementById('section6');
                                section?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                Book Now →
                            </span>
                        </p>
                    </div>
                    <button className={styles.closeButton} onClick={handleClose} aria-label="Close banner">
                        <FaTimes />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PromoBanner;
