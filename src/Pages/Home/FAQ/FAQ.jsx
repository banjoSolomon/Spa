import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';
import styles from './FAQ.module.css';

const faqs = [
    {
        id: 1,
        question: 'What are your operating hours?',
        answer: 'We are open Monday through Sunday from 9:00 AM to 10:00 PM. We recommend booking appointments in advance to ensure availability.'
    },
    {
        id: 2,
        question: 'Do I need to book an appointment in advance?',
        answer: 'While walk-ins are welcome, we highly recommend booking an appointment to guarantee your preferred time slot and therapist.'
    },
    {
        id: 3,
        question: 'What should I wear to my spa appointment?',
        answer: 'Wear comfortable, loose-fitting clothing. For massage and body treatments, you\'ll be provided with a robe and disposable undergarments. We ensure your privacy and comfort throughout your visit.'
    },
    {
        id: 4,
        question: 'How early should I arrive for my appointment?',
        answer: 'Please arrive 10-15 minutes before your scheduled appointment time. This allows you to complete any necessary paperwork and begin your relaxation experience.'
    },
    {
        id: 5,
        question: 'What is your cancellation policy?',
        answer: 'We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a fee.'
    },
    {
        id: 6,
        question: 'Are your products organic and natural?',
        answer: 'Yes! We use premium, natural, and organic products for all our treatments. We carefully select products that are gentle on the skin and environmentally friendly.'
    },
    {
        id: 7,
        question: 'Do you offer couples packages?',
        answer: 'Absolutely! We offer special couples packages that include side-by-side massages and other treatments in a private, romantic setting.'
    },
    {
        id: 8,
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, credit cards (Visa, Mastercard), debit cards, and mobile payments. Gift certificates are also available for purchase.'
    }
];

const FAQ = () => {
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className={styles.faqSection} id="faq">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <FaQuestionCircle className={styles.headerIcon} />
                    <span className={styles.sectionSubtitle}>Got Questions?</span>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <p className={styles.sectionDescription}>
                        Find answers to common questions about our services and policies
                    </p>
                </div>

                <div className={styles.faqList}>
                    {faqs.map((faq) => (
                        <motion.div
                            key={faq.id}
                            className={styles.faqItem}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: faq.id * 0.05 }}
                        >
                            <button
                                className={`${styles.faqQuestion} ${openId === faq.id ? styles.active : ''}`}
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <span>{faq.question}</span>
                                <span className={styles.icon}>
                                    {openId === faq.id ? <FaMinus /> : <FaPlus />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        className={styles.faqAnswer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.contactCTA}>
                    <p>Still have questions?</p>
                    <button
                        className={styles.contactButton}
                        onClick={() => {
                            const section = document.getElementById('section6');
                            section?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
