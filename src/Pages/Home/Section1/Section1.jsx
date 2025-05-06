import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import heroImage from "../../../asset/10967 1.png";
import { FaClock, FaCalendarAlt, FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Section1 = () => {
    const [time, setTime] = useState(new Date());
    const [status, setStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Business hours
    const openHour = 9;
    const closeHour = 22;

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
        const isOpen = hours >= openHour && hours < closeHour;
        setStatus(isOpen ? "Now Open" : "Now Closed");
    };

    const formatTime = (date) => {
        return {
            hours: String(date.getHours()).padStart(2, '0'),
            minutes: String(date.getMinutes()).padStart(2, '0'),
            seconds: String(date.getSeconds()).padStart(2, '0'),
            ampm: date.getHours() >= 12 ? 'PM' : 'AM'
        };
    };

    const { hours, minutes, seconds, ampm } = formatTime(time);
    const statusColor = status.includes("Closed") ? styles.closed : styles.open;

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
                        <button className={styles.primaryBtn}>
                            <FaCalendarAlt className={styles.btnIcon} />
                            Book Appointment
                            <FaArrowRight className={styles.btnArrow} />
                        </button>
                        <button className={styles.secondaryBtn}>
                            <FaPhoneAlt className={styles.btnIcon} />
                            Call Now
                            <FaArrowRight className={styles.btnArrow} />
                        </button>
                    </div>

                    <div className={styles.businessInfo}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIconContainer}>
                                <FaClock className={styles.infoIcon} />
                            </div>
                            <div>
                                <p className={styles.infoLabel}>Working Hours</p>
                                <p className={styles.infoText}>Mon-Sun: 9am - 10pm</p>
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
                        loading="eager" // Changed to eager for hero image
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
                            {status}
                            <span className={styles.statusPulse}></span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Section1;