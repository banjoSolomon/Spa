import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import styles from './index.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaFacebook />, url: "https://facebook.com", label: "Facebook" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
        { icon: <FaWhatsapp />, url: "https://wa.me/2348066306125", label: "WhatsApp" },
        { icon: <FaInstagram />, url: "https://www.instagram.com/beehavenbeautyspa/?hl=en", label: "Instagram" }
    ];

    const quickLinks = [
        { label: "About", url: "#about" },
        { label: "FAQ", url: "#faq" },
        { label: "Career", url: "#career" },
        { label: "Our Team", url: "#team" },
        { label: "Services", url: "#services" },
        { label: "Privacy Policy", url: "#privacy" },
        { label: "Terms of Service", url: "#terms" }
    ];

    const workingHours = [
        { days: "Monday – Friday", hours: "9am – 10pm" },
        { days: "Saturday", hours: "10am – 10pm EST" },
        { days: "Sunday", hours: "12pm – 10pm EST" }
    ];

    return (
        <footer className={styles.footer} aria-label="Website footer">
            <div className={styles.footerTop}>
                <div className={styles.newsletter}>
                    <h3>Join Our Newsletter</h3>
                    <p>Subscribe to receive updates, access to exclusive deals, and beauty tips.</p>
                    <form className={styles.newsletterForm}>
                        <input type="email" placeholder="Your email address" required aria-label="Email address" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className={styles.footerMain}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerSection}>
                        <h2 className={styles.sectionTitle}>Bee Heaven Beauty Spa</h2>
                        <p className={styles.aboutText}>
                            Your oasis of relaxation and beauty. We provide premium spa services with a personal touch to help you look and feel your best.
                        </p>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.footerSection}>
                        <h2 className={styles.sectionTitle}>Quick Links</h2>
                        <ul className={styles.linkList}>
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h2 className={styles.sectionTitle}>Working Hours</h2>
                        <ul className={styles.hoursList}>
                            {workingHours.map((item, index) => (
                                <li key={index}>
                                    <span className={styles.days}>{item.days}</span>
                                    <span className={styles.hours}>{item.hours}</span>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.holidayNotice}>
                            <p>Closed on major holidays</p>
                        </div>
                    </div>

                    <div className={styles.footerSection}>
                        <h2 className={styles.sectionTitle}>Contact Us</h2>
                        <ul className={styles.contactList}>
                            <li>
                                <FaMapMarkerAlt className={styles.contactIcon} />
                                <span>7 Adebare Street Ogudu, Lagos, Nigeria</span>
                            </li>
                            <li>
                                <FaPhoneAlt className={styles.contactIcon} />
                                <a href="tel:+2348066306125">(+234) 806 630 6125</a>
                            </li>
                            <li>
                                <FaEnvelope className={styles.contactIcon} />
                                <a href="mailto:info@beehaven.com">info@beehaven.com</a>
                            </li>
                        </ul>
                        <div className={styles.paymentMethods}>
                            <span>We accept:</span>
                            <div className={styles.paymentIcons}>
                                {/* Add your payment method icons here */}
                                <span>Visa</span>
                                <span>Mastercard</span>
                                <span>PayPal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.footerBottomContent}>
                    <p>&copy; {currentYear} Bee Heaven Beauty Spa. All rights reserved.</p>
                    <div className={styles.legalLinks}>
                        <a href="#privacy">Privacy Policy</a>
                        <span>|</span>
                        <a href="#terms">Terms of Service</a>
                        <span>|</span>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;