import React from 'react';
import { FaArrowRight, FaSpa, FaHands, FaSmile } from 'react-icons/fa';
import styles from './index.module.css';
import waxingImg from "../../../asset/wax.png";
import facialImg from "../../../asset/face.png";
import massageImg from "../../../asset/massage.png";

const services = [
    {
        name: 'Waxing',
        icon: <FaSpa className={styles.serviceIcon} />,
        image: waxingImg,
        description: 'Professional hair removal services for smooth, glowing skin',
        link: '#waxing'
    },
    {
        name: 'Facials',
        icon: <FaSmile className={styles.serviceIcon} />,
        image: facialImg,
        description: 'Rejuvenating treatments to refresh and revitalize your skin',
        link: '#facials'
    },
    {
        name: 'Massage',
        icon: <FaHands className={styles.serviceIcon} />,
        image: massageImg,
        description: 'Therapeutic techniques to relieve stress and tension',
        link: '#massage'
    },
];

const Section3 = () => {
    return (
        <section className={styles.servicesSection} id="services">
            <div className={styles.sectionHeader}>
                <span className={styles.sectionSubtitle}>What We Offer</span>
                <h2 className={styles.sectionTitle}>Our Premium Services</h2>
                <p className={styles.sectionDescription}>
                    A soothing environment where you can rest, relax, and feel completely rejuvenated.
                    Each treatment is carefully crafted to provide exceptional results.
                </p>
            </div>

            <div className={styles.servicesGrid}>
                {services.map((service, index) => (
                    <div key={index} className={styles.serviceCard}>
                        <div className={styles.serviceImageWrapper}>
                            <img
                                src={service.image}
                                alt={service.name}
                                className={styles.serviceImage}
                                loading="lazy"
                            />
                            <div className={styles.serviceIconWrapper}>
                                {service.icon}
                            </div>
                        </div>
                        <div className={styles.serviceContent}>
                            <h3 className={styles.serviceName}>{service.name}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                            <a href={service.link} className={styles.serviceLink}>
                                Learn More <FaArrowRight className={styles.linkArrow} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.ctaWrapper}>
                <button className={styles.ctaButton}>
                    View All Services
                </button>
            </div>
        </section>
    );
};

export default Section3;