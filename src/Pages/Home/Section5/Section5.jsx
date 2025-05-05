import React from "react";
import { FaTag, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import styles from './index.module.css';
import offer1 from "../../../asset/tiz.png";
import offer2 from "../../../asset/pro1.png";

const Section5 = () => {
    const offers = [
        {
            icon: <FaTag className={styles.offerIcon} />,
            title: "20% Off All Spa Services",
            description: "Enjoy a 20% discount on all wellness treatments. Treat yourself to the luxury you deserve.",
            image: offer1
        },
        {
            icon: <FaGraduationCap className={styles.offerIcon} />,
            title: "Wellness Training Sessions",
            description: "Enroll in our specialized training on holistic wellness, skincare, and massage techniques. Learn from the experts.",
            image: offer2
        }
    ];

    return (
        <section className={styles.specialOffers} id="offers">
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Exclusive Special Offers</h2>
                <p className={styles.sectionSubtitle}>
                    Limited-time promotions to enhance your wellness experience
                </p>
            </div>

            <div className={styles.offersContainer}>
                {offers.map((offer, index) => (
                    <div key={index} className={styles.offerCard}>
                        <div className={styles.offerContent}>
                            <div className={styles.offerHeader}>
                                <div className={styles.iconWrapper}>
                                    {offer.icon}
                                </div>
                                <h3 className={styles.offerTitle}>{offer.title}</h3>
                            </div>
                            <p className={styles.offerDescription}>{offer.description}</p>
                            <button className={styles.ctaButton}>
                                Claim Offer <FaArrowRight className={styles.arrowIcon} />
                            </button>
                        </div>
                        <div className={styles.offerImageWrapper}>
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className={styles.offerImage}
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.disclaimer}>
                <p>*Offers valid for a limited time only. Some restrictions may apply.</p>
            </div>
        </section>
    );
};

export default Section5;
