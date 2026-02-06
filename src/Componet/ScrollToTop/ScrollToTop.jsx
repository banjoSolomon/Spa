import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrolled / height) * 100;
            
            setScrollProgress(progress);
            setIsVisible(scrolled > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    className={styles.scrollToTop}
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Scroll to top"
                >
                    <svg className={styles.progressRing} width="60" height="60">
                        <circle
                            className={styles.progressRingCircle}
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="transparent"
                            r="27"
                            cx="30"
                            cy="30"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 27}`,
                                strokeDashoffset: `${2 * Math.PI * 27 * (1 - scrollProgress / 100)}`
                            }}
                        />
                    </svg>
                    <FaArrowUp className={styles.icon} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
