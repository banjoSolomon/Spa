import { useEffect, useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaClock, FaTimes, FaBars } from 'react-icons/fa';
import styles from './index.module.css';
import logo from '../../asset/bee.jpeg';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

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

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'contact', label: 'Contact' }
    ];

    const contactInfo = [
        { icon: <FaMapMarkerAlt />, text: '7 Adebare Street Ogudu' },
        { icon: <FaPhone />, text: '+234 806 630 6125' },
        { icon: <FaClock />, text: 'Mon-Sun: 9am-10pm' }
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
                            <div key={index} className={styles.contactItem}>
                                <span className={styles.contactIcon}>{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <button className={styles.ctaButton}>Book Appointment</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;