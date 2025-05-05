import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from './index.module.css';
import facialImg from "../../../asset/facials.png";
import pedicureImg from "../../../asset/pedicure.png";
import massageImg from "../../../asset/sol.png";

const featuredServices = [
    {
        title: 'Facials With Scrub',
        image: facialImg,
        description: 'Rejuvenating facial treatments with exfoliation for radiant skin',
        link: '#facials'
    },
    {
        title: 'Pedicure With Massage',
        image: pedicureImg,
        description: 'Luxurious foot care combined with relaxing massage therapy',
        link: '#pedicure'
    },
    {
        title: 'Therapeutic Massage',
        image: massageImg,
        description: 'Professional massage techniques to relieve stress and tension',
        link: '#massage'
    }
];

const Section4 = () => {
    return (
        <section className={styles.featuredServices} id="featured">
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Signature Treatments</h2>
                <p className={styles.sectionSubtitle}>
                    Our most popular services designed to pamper and revitalize
                </p>
            </div>

            <div className={styles.servicesGrid}>
                {featuredServices.map((service, index) => (
                    <div key={index} className={styles.serviceCard}>
                        <div className={styles.imageContainer}>
                            <img
                                src={service.image}
                                alt={service.title}
                                className={styles.serviceImage}
                                loading="lazy"
                            />
                            <div className={styles.imageOverlay}></div>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                            <a href={service.link} className={styles.serviceLink}>
                                Learn More <FaArrowRight className={styles.arrowIcon} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section4;