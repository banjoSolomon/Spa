import React from 'react';
import { FaLeaf, FaSpa, FaHeart } from 'react-icons/fa';
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

    return (
        <section className={styles.aboutSection} id="about">
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <img
                        src={aboutImage}
                        alt="Bee Heaven Spa interior"
                        className={styles.aboutImage}
                        loading="lazy"
                    />
                    <div className={styles.imageOverlay}></div>
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionSubtitle}>Welcome To</span>
                        <h2 className={styles.sectionTitle}>Bee Heaven Spa</h2>
                        <div className={styles.divider}></div>
                    </div>

                    <p className={styles.aboutText}>
                        At Bee Heaven Spa, we believe in the art of relaxation and rejuvenation.
                        Step into a world where tranquility meets luxury, and allow yourself to
                        unwind, recharge, and rediscover your inner peace. Your well-being is
                        our priority and every treatment is designed to nourish your body,
                        mind, and spirit.
                    </p>

                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIconWrapper}>
                                    {feature.icon}
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureText}>{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <button className={styles.ctaButton}>
                        Discover Our Treatments
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Section2;