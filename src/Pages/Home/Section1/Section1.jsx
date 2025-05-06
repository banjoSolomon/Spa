import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import heroImage from "../../../asset/10967 1.png";
import { FaClock, FaCalendarAlt, FaPhoneAlt, FaArrowRight, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Section1 = () => {
    const [time, setTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    // Business hours
    const openHour = 9;
    const closeHour = 22;
    const phoneNumber = '08128015621';
    const formattedPhoneNumber = '0812 801 5621';

    useEffect(() => {
        // Animation trigger
        setIsVisible(true);

        // Time update interval
        const intervalId = setInterval(() => {
            const newTime = new Date();
            setTime(newTime);
            updateStatus(newTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const updateStatus = (currentTime) => {
        const hours = currentTime.getHours();
        const currentIsOpen = hours >= openHour && hours < closeHour;
        setIsOpen(currentIsOpen);
    };

    const formatTime = (date) => {
        return {
            hours: String(date.getHours()).padStart(2, '0'),
            minutes: String(date.getMinutes()).padStart(2, '0'),
            seconds: String(date.getSeconds()).padStart(2, '0'),
            ampm: date.getHours() >= 12 ? 'PM' : 'AM'
        };
    };

    const handleCallNow = () => {
        setShowPhoneNumber(true);
    };

    const initiateCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const { hours, minutes, seconds, ampm } = formatTime(time);
    const statusColor = isOpen ? styles.open : styles.closed;
    const statusText = isOpen ? "Now Open" : "Now Closed";

    // Get current opening status message
    const getAvailabilityMessage = () => {
        if (isOpen) {
            return `We're currently open (until ${closeHour}:00)`;
        } else {
            const now = new Date();
            const currentHour = now.getHours();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(openHour, 0, 0, 0);

            if (currentHour < openHour) {
                return `We'll open today at ${openHour}:00`;
            } else {
                return `We'll open tomorrow at ${openHour}:00`;
            }
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 20, rotateY: -5 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: -5,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        hover: {
            rotateY: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const phoneModalVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 }
    };

    return (
        <motion.section
            className={styles.heroSection}
            id="home"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className={styles.contentWrapper}>
                <motion.div className={styles.textContent} variants={textVariants}>
                    <h1 className={styles.heading}>
                        <span className={styles.accentText}>Be Beautiful</span><br />
                        You Deserve Time For<br />
                        <span className={styles.highlight}>Perfection</span>
                    </h1>

                    <p className={styles.subtext}>
                        Experience premium spa treatments in a serene environment designed for your ultimate relaxation and rejuvenation.
                    </p>

                    <div className={styles.ctaContainer}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => {
                                const section = document.getElementById('section6');
                                section?.scrollIntoView({behavior: 'smooth'});
                            }}
                        >
                            <FaCalendarAlt className={styles.btnIcon}/>
                            Book Appointment
                            <FaArrowRight className={styles.btnArrow}/>
                        </button>
                        <button
                            className={styles.secondaryBtn}
                            onClick={handleCallNow}
                        >
                            <FaPhoneAlt className={styles.btnIcon}/>
                            Call Now
                            <FaArrowRight className={styles.btnArrow}/>
                        </button>
                    </div>

                    <div className={styles.businessInfo}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIconContainer}>
                                <FaClock className={styles.infoIcon}/>
                            </div>
                            <div>
                                <p className={styles.infoLabel}>Working Hours</p>
                                <p className={styles.infoText}>Mon-Sun: {openHour}:00 - {closeHour}:00</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.imageContent}
                    variants={imageVariants}
                    whileHover="hover"
                >
                    <img
                        src={heroImage}
                        alt="Beauty spa treatment"
                        className={styles.heroImage}
                        loading="eager"
                    />

                    <div className={styles.timeStatusContainer}>
                        <div className={styles.liveTime}>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeDigit}>{hours}</span>
                                <span className={styles.timeLabel}>Hours</span>
                            </div>
                            <span className={styles.timeSeparator}>:</span>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeDigit}>{minutes}</span>
                                <span className={styles.timeLabel}>Minutes</span>
                            </div>
                            <span className={styles.timeSeparator}>:</span>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeDigit}>{seconds}</span>
                                <span className={styles.timeLabel}>Seconds</span>
                            </div>
                            <span className={styles.ampm}>{ampm}</span>
                        </div>
                        <div className={`${styles.statusBadge} ${statusColor}`}>
                            {statusText}
                            <span className={styles.statusPulse}></span>
                        </div>
                    </div>
                </motion.div>

                {showPhoneNumber && (
                    <motion.div
                        className={styles.phoneModalOverlay}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        onClick={() => setShowPhoneNumber(false)}
                    >
                        <motion.div
                            className={styles.phoneModal}
                            variants={phoneModalVariants}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowPhoneNumber(false)}
                            >
                                <FaTimes />
                            </button>
                            <div className={styles.phoneIcon}>
                                <FaPhoneAlt />
                            </div>
                            <h3 className={styles.phoneTitle}>Call Us Now</h3>
                            <p className={styles.phoneNumber}>{formattedPhoneNumber}</p>
                            <button
                                className={styles.callButton}
                                onClick={initiateCall}
                                disabled={!isOpen}
                            >
                                <FaPhoneAlt className={styles.callIcon} />
                                {isOpen ? 'Tap to Call' : 'Currently Closed'}
                            </button>
                            <p className={styles.phoneNote}>
                                {getAvailabilityMessage()}
                            </p>
                            <p className={styles.businessHours}>
                                Business Hours: {openHour}:00 - {closeHour}:00
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}

export default Section1;