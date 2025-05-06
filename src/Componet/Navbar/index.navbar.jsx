import { useEffect, useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaClock, FaTimes, FaBars, FaCopy, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './index.module.css';
import logo from '../../asset/bee.jpeg';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active link based on scroll position
            const sections = ['home', 'about', 'gallery', 'contact'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveLink(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
    };

    const handleLinkClick = (section) => {
        setActiveLink(section);
        setMenuOpen(false);
        document.body.style.overflow = 'auto';

        const element = document.getElementById(section);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    const handleAddressClick = () => {
        setShowAddressModal(true);
        setMenuOpen(false);
    };

    const handlePhoneClick = () => {
        setShowPhoneModal(true);
        setMenuOpen(false);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openGoogleMaps = () => {
        window.open('https://www.google.com/maps/search/?api=1&query=Bee+Heaven+Beauty+Spa+7+Adebare+Street+Ogudu', '_blank');
    };

    const openWhatsApp = () => {
        window.open('https://wa.me/2348066306125', '_blank');
    };

    const sendEmail = () => {
        window.location.href = 'mailto:info@beeheavenbeautyspa.com';
    };

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'contact', label: 'Contact' }
    ];

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt />,
            text: '7 Adebare Street Ogudu',
            action: handleAddressClick
        },
        {
            icon: <FaPhone />,
            text: '+234 806 630 6125',
            action: handlePhoneClick
        },
        {
            icon: <FaClock />,
            text: 'Mon-Sun: 9am-10pm'
        }
    ];

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <img
                        src={logo}
                        alt="Bee Heaven Beauty Spa Logo"
                        className={styles.logo}
                        onClick={() => handleLinkClick('home')}
                    />
                    <span className={styles.logoText}>Bee Heaven Beauty Spa</span>
                </div>

                <div className={styles.hamburger} onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    className={activeLink === link.id ? styles.active : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLinkClick(link.id);
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.contactInfo}>
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className={styles.contactItem}
                                onClick={item.action || undefined}
                                style={item.action ? { cursor: 'pointer' } : {}}
                            >
                                <span className={styles.contactIcon}>{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        className={styles.ctaButton}
                        onClick={() => {
                            const section = document.getElementById('section6');
                            section?.scrollIntoView({behavior: 'smooth'});
                        }}
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Address Modal */}
            {showAddressModal && (
                <div className={styles.modalOverlay} onClick={() => setShowAddressModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeModalButton}
                            onClick={() => setShowAddressModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <div className={styles.modalIcon}>
                            <FaMapMarkerAlt />
                        </div>
                        <h3 className={styles.modalTitle}>Our Location</h3>
                        <p className={styles.modalText}>7 Adebare Street, Ogudu, Lagos</p>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.mapButton}
                                onClick={openGoogleMaps}
                            >
                                Open in Google Maps
                            </button>
                            <button
                                className={styles.copyButton}
                                onClick={() => copyToClipboard('7 Adebare Street, Ogudu, Lagos')}
                            >
                                <FaCopy /> {copied ? 'Copied!' : 'Copy Address'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Phone Modal */}
            {showPhoneModal && (
                <div className={styles.modalOverlay} onClick={() => setShowPhoneModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeModalButton}
                            onClick={() => setShowPhoneModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <div className={styles.modalIcon}>
                            <FaPhone />
                        </div>
                        <h3 className={styles.modalTitle}>Contact Us</h3>
                        <p className={styles.modalText}>+234 806 630 6125</p>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.callButton}
                                onClick={() => window.location.href = 'tel:+2348066306125'}
                            >
                                <FaPhone /> Call Now
                            </button>
                            <button
                                className={styles.whatsappButton}
                                onClick={openWhatsApp}
                            >
                                <FaWhatsapp /> WhatsApp
                            </button>
                            <button
                                className={styles.copyButton}
                                onClick={() => copyToClipboard('+2348066306125')}
                            >
                                <FaCopy /> {copied ? 'Copied!' : 'Copy Number'}
                            </button>
                        </div>

                        <div className={styles.alternateContact}>
                            <p>Or contact us via:</p>
                            <button
                                className={styles.emailButton}
                                onClick={sendEmail}
                            >
                                <MdEmail /> Email Us
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;