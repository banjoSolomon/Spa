import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TestimonialsCarousel.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        service: 'Facial Treatment',
        rating: 5,
        text: 'Absolutely amazing experience! The facial treatment left my skin glowing for weeks. The staff is professional and the ambiance is so relaxing.',
        image: null,
        date: '2 weeks ago'
    },
    {
        id: 2,
        name: 'Michael Chen',
        service: 'Deep Tissue Massage',
        rating: 5,
        text: 'Best massage I\'ve ever had! Joy has magic hands. My chronic back pain has significantly improved after just a few sessions.',
        image: null,
        date: '1 month ago'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        service: 'Full Spa Package',
        rating: 5,
        text: 'Treated myself to the full spa package and it was worth every penny. From the massage to the facial, everything was perfect!',
        image: null,
        date: '3 weeks ago'
    },
    {
        id: 4,
        name: 'David Thompson',
        service: 'Waxing Service',
        rating: 4,
        text: 'Professional and painless waxing service. Arinola made me feel comfortable throughout the entire process. Highly recommend!',
        image: null,
        date: '1 week ago'
    },
    {
        id: 5,
        name: 'Lisa Anderson',
        service: 'Aromatherapy Massage',
        rating: 5,
        text: 'The aromatherapy massage was heavenly! The essential oils and the relaxing atmosphere helped me de-stress completely.',
        image: null,
        date: '2 days ago'
    }
];

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                nextTestimonial();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isPaused]);

    const nextTestimonial = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionSubtitle}>Client Reviews</span>
                <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
                <p className={styles.sectionDescription}>
                    Real experiences from our valued clients
                </p>
            </div>

            <div
                className={styles.carouselContainer}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                >
                    <FaChevronLeft />
                </button>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className={styles.testimonialCard}
                    >
                        <FaQuoteLeft className={styles.quoteIcon} />
                        
                        <div className={styles.rating}>
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < testimonials[currentIndex].rating ? styles.filledStar : styles.emptyStar}
                                />
                            ))}
                        </div>

                        <p className={styles.testimonialText}>
                            {testimonials[currentIndex].text}
                        </p>

                        <div className={styles.clientInfo}>
                            <div className={styles.clientAvatar}>
                                {testimonials[currentIndex].name.charAt(0)}
                            </div>
                            <div>
                                <h4 className={styles.clientName}>{testimonials[currentIndex].name}</h4>
                                <p className={styles.clientService}>{testimonials[currentIndex].service}</p>
                                <p className={styles.clientDate}>{testimonials[currentIndex].date}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className={styles.indicators}>
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
                        onClick={() => goToTestimonial(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
