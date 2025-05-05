import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import heroImage from "../../../asset/10967 1.png";
import { FaClock, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

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
            seconds: String(date.getSeconds()).padStart(2, '0')
        };
    };

    const { hours, minutes, seconds } = formatTime(time);
    const statusColor = status.includes("Closed") ? styles.closed : styles.open;

    return (
        <section className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`} id="home">
            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <h1 className={styles.heading}>
                        <span className={styles.accentText}>Be Beautiful</span><br />
                        You Deserve Time For<br />
                        <span className={styles.highlight}>Perfection</span>
                    </h1>

                    <div className={styles.ctaContainer}>
                        <button className={styles.primaryBtn}>
                            <FaCalendarAlt className={styles.btnIcon} />
                            Book Appointment
                        </button>
                        <button className={styles.secondaryBtn}>
                            <FaPhoneAlt className={styles.btnIcon} />
                            Call Now
                        </button>
                    </div>

                    <div className={styles.businessInfo}>
                        <div className={styles.infoItem}>
                            <FaClock className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Working Hours</p>
                                <p className={styles.infoText}>Mon-Sun: 9am - 10pm</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.imageContent}>
                    <img
                        src={heroImage}
                        alt="Beauty spa treatment"
                        className={styles.heroImage}
                        loading="lazy"
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
                        </div>
                        <div className={`${styles.statusBadge} ${statusColor}`}>
                            {status}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section1;