import React, { useEffect, useRef, useState } from 'react';
import { FaLeaf, FaSpa, FaHeart, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';
import aboutImage from "../../../asset/deb.png";

const Section2 = () => {
    const features = [
        {
            icon: <FaLeaf className={styles.featureIcon} />,
            title: "Natural Ingredients",
            description: "We use only the finest natural ingredients for all our treatments"
        },
        {
            icon: <FaSpa className={styles.featureIcon} />,
            title: "Expert Therapists",
            description: "Our certified professionals provide exceptional care"
        },
        {
            icon: <FaHeart className={styles.featureIcon} />,
            title: "Personalized Care",
            description: "Tailored treatments for your unique needs"
        }
    ];

    const spaQuotes = [
        "Relaxation is the first step to rejuvenation of the body and soul.",
        "Your body is a temple, but only if you treat it as one.",
        "The best cure for the body is a quiet mind.",
        "Self-care is how you take your power back.",
        "Take time to do what makes your soul happy.",
        "The greatest wealth is health.",
        "Peace is the result of retraining your mind to process life as it is.",
        "Almost everything will work again if you unplug it for a few minutes, including you.",
        "The quieter you become, the more you can hear.",
        "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit."
    ];

    // Animation controls
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    // Quotes animation
    const quotesContainerRef = useRef(null);
    const animationRef = useRef(null);
    const [currentQuotes] = useState([...spaQuotes, ...spaQuotes]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [hoveredFeature, setHoveredFeature] = useState(null);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    useEffect(() => {
        const scrollQuotes = () => {
            setScrollPosition(prev => {
                const newPosition = prev + 0.5;
                if (quotesContainerRef.current &&
                    newPosition >= quotesContainerRef.current.scrollWidth / 2) {
                    return 0;
                }
                return newPosition;
            });
            animationRef.current = requestAnimationFrame(scrollQuotes);
        };

        animationRef.current = requestAnimationFrame(scrollQuotes);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const featureCardVariants = {
        rest: { scale: 1, y: 0 },
        hover: {
            scale: 1.03,
            y: -5,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            className={styles.aboutSection}
            id="about"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
        >
            <div className={styles.container}>
                <motion.div
                    className={styles.imageWrapper}
                    variants={itemVariants}
                >
                    <img
                        src={aboutImage}
                        alt="Bee Heaven Spa interior"
                        className={styles.aboutImage}
                        loading="lazy"
                    />
                    <div className={styles.imageOverlay}></div>
                    <div className={styles.imageDecoration}></div>
                </motion.div>

                <motion.div
                    className={styles.contentWrapper}
                    variants={containerVariants}
                >
                    <motion.div
                        className={styles.sectionHeader}
                        variants={itemVariants}
                    >
                        <span className={styles.sectionSubtitle}>Welcome To</span>
                        <h2 className={styles.sectionTitle}>Bee Heaven Spa</h2>
                        <div className={styles.divider}></div>
                    </motion.div>

                    <motion.p
                        className={styles.aboutText}
                        variants={itemVariants}
                    >
                        At Bee Heaven Spa, we believe in the art of relaxation and rejuvenation.
                        Step into a world where tranquility meets luxury, and allow yourself to
                        unwind, recharge, and rediscover your inner peace. Your well-being is
                        our priority and every treatment is designed to nourish your body,
                        mind, and spirit.
                    </motion.p>

                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={styles.featureCard}
                                variants={itemVariants}
                                initial="rest"
                                whileHover="hover"
                                animate={hoveredFeature === index ? "hover" : "rest"}
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                                variants={featureCardVariants}
                            >
                                <div className={styles.featureIconWrapper}>
                                    {feature.icon}
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureText}>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        className={styles.ctaButton}
                        onClick={() => {
                            const section = document.getElementById('section6');
                            section?.scrollIntoView({behavior: 'smooth'});
                        }}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 16px rgba(27, 94, 32, 0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Discover Our Treatments
                        <FaArrowRight className={styles.ctaIcon} />
                    </motion.button>
                </motion.div>
            </div>

            {/* Enhanced Quotes Section */}
            <div className={styles.quotesOuterContainer}>
                <div className={styles.quotesBackground}></div>
                <div
                    className={styles.quotesContainer}
                    ref={quotesContainerRef}
                    style={{
                        transform: `translateX(-${scrollPosition}px)`
                    }}
                >
                    {currentQuotes.map((quote, index) => (
                        <div key={index} className={styles.quote}>
                            <FaQuoteLeft className={styles.quoteIcon} />
                            <span className={styles.quoteText}>{quote}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.quotesOverlayLeft}></div>
                <div className={styles.quotesOverlayRight}></div>
            </div>
        </motion.section>
    );
};

export default Section2;