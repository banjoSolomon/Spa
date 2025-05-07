import React, { useState, useEffect, useRef } from 'react';
import {
    FaArrowRight, FaSpa, FaHands, FaSmile, FaTimes, FaStar,
    FaChevronLeft, FaChevronRight, FaRegCalendarAlt, FaPhoneAlt,
    FaMapMarkerAlt, FaClock, FaCertificate, FaHeart
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.css';
import waxingImg from "../../../asset/wax.png";
import facialImg from "../../../asset/face.png";
import massageImg from "../../../asset/massage.png";

// Import therapist images
import arinolaImg from "../../../asset/Arinola.jpg";
import arinolaImg1 from "../../../asset/Arinola1.jpg";
import arinolaImg2 from "../../../asset/Arinola2.jpg";
import joyImg from "../../../asset/Joy.jpg";
import joyImg2 from "../../../asset/Joy2.jpg";
import joyImg3 from "../../../asset/Joy3.jpg";
import MinaImg from  "../../../asset/Mina.jpg"
import MinaImg2 from  "../../../asset/Mina2.jpg"
import MinaImg4 from  "../../../asset/Mina4.jpg"
import MinaImg6 from  "../../../asset/Mina6.jpg"
// Animation variants
const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};

const services = [
    {
        id: 1,
        name: 'Waxing',
        icon: <FaSpa className={styles.serviceIcon} />,
        image: waxingImg,
        description: 'Professional hair removal services for smooth, glowing skin',
        link: '#waxing',
        duration: '30-90 mins',
        popular: true
    },
    {
        id: 2,
        name: 'Facials',
        icon: <FaSmile className={styles.serviceIcon} />,
        image: facialImg,
        description: 'Rejuvenating treatments to refresh and revitalize your skin',
        link: '#facials',
        duration: '60 mins',
        popular: false
    },
    {
        id: 3,
        name: 'Massage',
        icon: <FaHands className={styles.serviceIcon} />,
        image: massageImg,
        description: 'Therapeutic techniques to relieve stress and tension',
        link: '#massage',
        duration: '60-120 mins',
        popular: true
    },
];

const therapists = [
    {
        id: 1,
        name: 'Arinola',
        title: 'Senior Esthetician',
        images: [arinolaImg, arinolaImg1, arinolaImg2],
        bio: 'With over 5 years of experience in skincare, Arinola specializes in advanced facial treatments and waxing techniques. Her gentle approach ensures maximum results with minimal discomfort.',
        specialties: ['Facials', 'Waxing', 'Chemical Peels', 'Microdermabrasion', 'Massage'],
        rating: 4.9,
        reviews: 128,
        experience: '5+ years',
        quote: 'Your skin tells a story, let me help make it a beautiful one.',
        certifications: ['Licensed Massage Therapist', 'Advanced Skincare Specialist'],
        focusArea: 'Face-focused treatments',
        availability: ['Mon-Wed: 9am-5pm', 'Fri: 10am-6pm'],
        languages: ['English', 'Yoruba']
    },
    {
        id: 2,
        name: 'Joy',
        title: 'Massage Therapist',
        images: [joyImg, joyImg2, joyImg3],
        bio: 'Joy brings healing hands and a holistic approach to massage therapy. Trained in multiple modalities including Swedish, deep tissue, and hot stone massage. She believes in the power of touch to heal both body and mind.',
        specialties: ['Massage', 'Aromatherapy', 'Reflexology', 'Hot Stone Therapy', 'Facials'],
        rating: 4.8,
        reviews: 95,
        experience: '4 years',
        quote: 'Healing begins with touch and intention.',
        certifications: ['Licensed Massage Therapist', 'Reiki Master'],
        focusArea: 'Full-body relaxation',
        availability: ['Tue-Thu: 10am-7pm', 'Sat: 9am-4pm'],
        languages: ['English', 'French']
    },
    {
        id: 3,
        name: 'Mina',
        title: 'Massage Therapist',
        images: [MinaImg, MinaImg2, MinaImg4, MinaImg6],
        bio: 'Mina brings healing hands and a holistic approach to massage therapy. Trained in multiple modalities including Swedish, deep tissue, and hot stone massage. She believes in the power of touch to heal both body and mind.',
        specialties: ['Massage', 'Aromatherapy', 'Reflexology', 'Hot Stone Therapy', 'Facials'],
        rating: 4.8,
        reviews: 95,
        experience: '4 years',
        quote: 'Relax your body, renew your mind, refresh your soul.',
        certifications: ['Licensed Massage Therapist', 'Reiki Master'],
        focusArea: 'Full-body relaxation',
        availability: ['Tue-Thu: 10am-7pm', 'Sat: 9am-4pm'],
        languages: ['English', 'French']
    }
];

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        date: '2 weeks ago',
        content: 'Arinola gave me the best facial of my life! My skin has never looked better. Highly recommend her services.',
        therapistId: 1
    },
    {
        id: 2,
        name: 'Michael Brown',
        rating: 5,
        date: '1 month ago',
        content: 'Joy has magic hands! My chronic back pain has significantly improved after just a few sessions.',
        therapistId: 2
    },
    {
        id: 3,
        name: 'Emily Davis',
        rating: 4,
        date: '3 weeks ago',
        content: 'The waxing service was painless and my skin feels amazing. Will definitely be coming back!.',
        therapistId: 1
    },
    {
        id: 3,
        name: 'Emily Davis',
        rating: 4,
        date: '3 weeks ago',
        content: 'Mina has magic hands! My chronic back pain has significantly improved after just a few sessions.',
        therapistId: 3
    }
];

const Section3 = () => {
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);
    const carouselRef = useRef(null);

    // Sample available time slots
    const availableTimes = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (selectedTherapist) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedTherapist]);

    const handleTherapistClick = (therapist) => {
        setSelectedTherapist(therapist);
        setCurrentImageIndex(0);
        setIsZoomed(false);
        setActiveTab('about');
        setBookingStep(1);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedTherapist(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % selectedTherapist.images.length
        );
        setIsZoomed(false);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + selectedTherapist.images.length) % selectedTherapist.images.length
        );
        setIsZoomed(false);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleBooking = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setBookingStep(2);
        }, 1500);
    };

    const completeBooking = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setBookingStep(3);
        }, 1500);
    };

    const scrollToServices = () => {
        const element = document.getElementById('services');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                    <motion.div
                        key={service.id}
                        className={styles.serviceCard}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                    >
                        {service.popular && (
                            <div className={styles.popularBadge}>
                                <FaHeart /> Popular
                            </div>
                        )}
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
                            <div className={styles.durationBadge}>
                                {service.duration}
                            </div>
                        </div>
                        <div className={styles.serviceContent}>
                            <h3 className={styles.serviceName}>{service.name}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                            <a href={service.link} className={styles.serviceLink}>
                                Learn More <FaArrowRight className={styles.linkArrow} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Therapist Section */}
            <div className={styles.therapistHeader}>
                <h2 className={styles.sectionTitle}>Meet Our Specialists</h2>
                <p className={styles.sectionDescription}>
                    Our certified professionals are dedicated to providing you with personalized, high-quality care.
                </p>
            </div>

            <div className={styles.therapistsGrid}>
                {therapists.map((therapist) => (
                    <motion.div
                        key={therapist.id}
                        className={styles.therapistCard}
                        onClick={() => handleTherapistClick(therapist)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                    >
                        <div className={styles.therapistImageWrapper}>
                            <div className={styles.faceFocusContainer}>
                                <img
                                    src={therapist.images[0]}
                                    alt={therapist.name}
                                    className={styles.therapistFaceImage}
                                    loading="lazy"
                                />
                            </div>
                            <div className={styles.therapistOverlay}>
                                <div>
                                    <h3>{therapist.name}</h3>
                                    <p>{therapist.title}</p>
                                    <div className={styles.ratingPreview}>
                                        <FaStar className={styles.filledStar} />
                                        <span>{therapist.rating} ({therapist.reviews})</span>
                                    </div>
                                    <div className={styles.specialtyPreview}>
                                        {therapist.specialties.slice(0, 2).map((specialty, index) => (
                                            <span key={index}>{specialty}</span>
                                        ))}
                                        {therapist.specialties.length > 2 && (
                                            <span>+{therapist.specialties.length - 2} more</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className={styles.ctaWrapper}>
                <button className={styles.ctaButton} onClick={scrollToServices}>
                    View All Services
                </button>
            </div>

            {/* Therapist Modal */}
            <AnimatePresence>
                {selectedTherapist && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className={styles.modalContent}
                            ref={modalRef}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button className={styles.closeButton} onClick={closeModal}>
                                <FaTimes />
                            </button>

                            {bookingStep === 1 && (
                                <div className={styles.modalGrid}>
                                    <div className={styles.modalImages}>
                                        <div
                                            className={`${styles.mainImageContainer} ${isZoomed ? styles.zoomed : ''}`}
                                            onClick={toggleZoom}
                                            ref={carouselRef}
                                        >
                                            <img
                                                src={selectedTherapist.images[currentImageIndex]}
                                                alt={selectedTherapist.name}
                                                className={styles.mainImage}
                                            />
                                            <button
                                                className={styles.navButtonLeft}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    prevImage();
                                                }}
                                            >
                                                <FaChevronLeft />
                                            </button>
                                            <button
                                                className={styles.navButtonRight}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    nextImage();
                                                }}
                                            >
                                                <FaChevronRight />
                                            </button>
                                            <div className={styles.imageCounter}>
                                                {currentImageIndex + 1}/{selectedTherapist.images.length}
                                            </div>
                                        </div>
                                        <div className={styles.thumbnailContainer}>
                                            {selectedTherapist.images.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`${selectedTherapist.name} ${index}`}
                                                    className={`${styles.thumbnail} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(index);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.modalMainContent}>
                                        <div className={styles.therapistHeaderInfo}>
                                            <h2>{selectedTherapist.name}</h2>
                                            <p className={styles.therapistTitle}>{selectedTherapist.title}</p>
                                        </div>

                                        <div className={styles.ratingExperience}>
                                            <div className={styles.rating}>
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`${styles.star} ${i < Math.floor(selectedTherapist.rating) ? styles.filledStar : ''}`}
                                                    />
                                                ))}
                                                <span>{selectedTherapist.rating} ({selectedTherapist.reviews} reviews)</span>
                                            </div>
                                            <div className={styles.experienceBadge}>
                                                {selectedTherapist.experience} experience
                                            </div>
                                        </div>

                                        <div className={styles.tabs}>
                                            <button
                                                className={`${styles.tabButton} ${activeTab === 'about' ? styles.activeTab : ''}`}
                                                onClick={() => handleTabChange('about')}
                                            >
                                                About
                                            </button>
                                            <button
                                                className={`${styles.tabButton} ${activeTab === 'services' ? styles.activeTab : ''}`}
                                                onClick={() => handleTabChange('services')}
                                            >
                                                Services
                                            </button>
                                            <button
                                                className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
                                                onClick={() => handleTabChange('reviews')}
                                            >
                                                Reviews
                                            </button>
                                            <button
                                                className={`${styles.tabButton} ${activeTab === 'availability' ? styles.activeTab : ''}`}
                                                onClick={() => handleTabChange('availability')}
                                            >
                                                Availability
                                            </button>
                                        </div>

                                        <div className={styles.tabContent}>
                                            {activeTab === 'about' && (
                                                <>
                                                    <div className={styles.focusArea}>
                                                        <span>Focus:</span> {selectedTherapist.focusArea}
                                                    </div>

                                                    <p className={styles.quote}>"{selectedTherapist.quote}"</p>

                                                    <div className={styles.infoSection}>
                                                        <h3>Bio</h3>
                                                        <p className={styles.bio}>{selectedTherapist.bio}</p>
                                                    </div>

                                                    <div className={styles.infoSection}>
                                                        <h3>Languages</h3>
                                                        <div className={styles.specialties}>
                                                            {selectedTherapist.languages.map((language, index) => (
                                                                <span key={index} className={styles.specialtyBadge}>
                                                                    {language}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {activeTab === 'services' && (
                                                <>
                                                    <div className={styles.infoSection}>
                                                        <h3>Specialties</h3>
                                                        <div className={styles.specialties}>
                                                            {selectedTherapist.specialties.map((specialty, index) => (
                                                                <span key={index} className={styles.specialtyBadge}>
                                                                    {specialty}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className={styles.infoSection}>
                                                        <h3>Certifications</h3>
                                                        <ul className={styles.certificationsList}>
                                                            {selectedTherapist.certifications.map((cert, index) => (
                                                                <li key={index}>
                                                                    <FaCertificate /> {cert}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </>
                                            )}

                                            {activeTab === 'reviews' && (
                                                <div className={styles.reviewsContainer}>
                                                    <h3>Client Testimonials</h3>
                                                    {testimonials
                                                        .filter(t => t.therapistId === selectedTherapist.id)
                                                        .map(testimonial => (
                                                            <div key={testimonial.id} className={styles.reviewCard}>
                                                                <div className={styles.reviewHeader}>
                                                                    <div className={styles.reviewerInfo}>
                                                                        <div className={styles.reviewerInitial}>
                                                                            {testimonial.name.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <div className={styles.reviewerName}>{testimonial.name}</div>
                                                                            <div className={styles.reviewDate}>{testimonial.date}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.reviewRating}>
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <FaStar
                                                                                key={i}
                                                                                className={`${styles.star} ${i < testimonial.rating ? styles.filledStar : ''}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <p className={styles.reviewContent}>{testimonial.content}</p>
                                                            </div>
                                                        ))}
                                                    <button className={styles.viewAllReviews}>
                                                        View All Reviews
                                                    </button>
                                                </div>
                                            )}

                                            {activeTab === 'availability' && (
                                                <div className={styles.availabilityContainer}>
                                                    <h3>Availability</h3>
                                                    <div className={styles.availabilitySlots}>
                                                        {selectedTherapist.availability.map((slot, index) => (
                                                            <div key={index} className={styles.timeSlot}>
                                                                <FaClock /> {slot}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className={styles.locationInfo}>
                                                        <h4>Location</h4>
                                                        <div className={styles.locationDetail}>
                                                            <FaMapMarkerAlt />
                                                            <span>7 Adebare Street, Ogudu Lagos</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.modalButtons}>
                                            <button
                                                className={styles.bookButton}
                                                onClick={handleBooking}
                                            >
                                                <FaRegCalendarAlt /> Book Appointment
                                            </button>
                                            <button className={styles.consultationButton}>
                                                <FaPhoneAlt /> Free Consultation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 2 && (
                                <div className={styles.bookingContainer}>
                                    <h2>Book with {selectedTherapist.name}</h2>
                                    <div className={styles.bookingSteps}>
                                        <div className={`${styles.step} ${styles.activeStep}`}>
                                            <div className={styles.stepNumber}>1</div>
                                            <div className={styles.stepText}>Select Date & Time</div>
                                        </div>
                                        <div className={styles.step}>
                                            <div className={styles.stepNumber}>2</div>
                                            <div className={styles.stepText}>Your Information</div>
                                        </div>
                                        <div className={styles.step}>
                                            <div className={styles.stepNumber}>3</div>
                                            <div className={styles.stepText}>Confirmation</div>
                                        </div>
                                    </div>

                                    <div className={styles.calendarSection}>
                                        <h3>Select a Date</h3>
                                        <div className={styles.dateGrid}>
                                            {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                                <div
                                                    key={day}
                                                    className={`${styles.dateCell} ${day === 3 ? styles.selectedDate : ''}`}
                                                    onClick={() => setSelectedDate(day)}
                                                >
                                                    <div className={styles.day}>Mon</div>
                                                    <div className={styles.dateNumber}>{day + 10}</div>
                                                    <div className={styles.month}>Jun</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.timeSelection}>
                                        <h3>Available Time Slots</h3>
                                        <div className={styles.timeSlotsGrid}>
                                            {availableTimes.map((time, index) => (
                                                <button
                                                    key={index}
                                                    className={`${styles.timeSlotButton} ${selectedTime === time ? styles.selectedTime : ''}`}
                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.bookingActions}>
                                        <button
                                            className={styles.backButton}
                                            onClick={() => setBookingStep(1)}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className={styles.continueButton}
                                            onClick={completeBooking}
                                            disabled={!selectedDate || !selectedTime || isLoading}
                                        >
                                            {isLoading ? 'Loading...' : 'Continue'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 3 && (
                                <div className={styles.confirmationContainer}>
                                    <div className={styles.confirmationIcon}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                        </svg>
                                    </div>
                                    <h2>Appointment Booked!</h2>
                                    <p className={styles.confirmationText}>
                                        Your appointment with {selectedTherapist.name} has been confirmed for
                                        <strong> June {selectedDate} at {selectedTime}</strong>.
                                    </p>
                                    <div className={styles.appointmentDetails}>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Therapist:</span>
                                            <span>{selectedTherapist.name}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Date & Time:</span>
                                            <span>June {selectedDate} at {selectedTime}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Location:</span>
                                            <span>7 Adebare Street, Ogudu Lagos</span>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.doneButton}
                                        onClick={closeModal}
                                    >
                                        Done
                                    </button>
                                    <div className={styles.addToCalendar}>
                                        <button className={styles.calendarButton}>
                                            Add to Google Calendar
                                        </button>
                                        <button className={styles.calendarButton}>
                                            Add to Apple Calendar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Section3;