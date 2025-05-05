import React, { useState } from "react";
import {FaCalendarAlt, FaPhoneAlt, FaUser, FaEnvelope, FaComment, FaSpa} from 'react-icons/fa';
import styles from "./index.module.css";
import appointmentImage from "../../../asset/Mask Group.png";

const Section6 = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        service: "",
        date: "",
        time: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const services = [
        "Select a service",
        "Facial Treatment",
        "Body Massage",
        "Waxing",
        "Pedicure & Manicure",
        "Full Spa Package"
    ];

    const availableTimes = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
        "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{11}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 11 digits";
        }
        if (!formData.service || formData.service === "Select a service") {
            newErrors.service = "Please select a service";
        }
        if (!formData.date) newErrors.date = "Please select a date";
        if (!formData.time) newErrors.time = "Please select a time";
        if (!formData.message.trim()) newErrors.message = "Please add your message";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const { name, email, phone, message, service, date, time } = formData;
            const phoneNumber = "2348066306125";

            const preFilledMessage = `New Appointment Request:%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0ADate: ${encodeURIComponent(date)}%0ATime: ${encodeURIComponent(time)}%0AMessage: ${encodeURIComponent(message)}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${preFilledMessage}`;
            window.open(whatsappUrl, "_blank");

            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                service: "",
                date: "",
                time: ""
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section className={styles.appointmentSection} id="appointment">
            <div className={styles.imageContainer}>
                <img
                    src={appointmentImage}
                    alt="Spa appointment"
                    className={styles.appointmentImage}
                    loading="lazy"
                />
                <div className={styles.overlay}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Book Your Relaxation Session</h2>
                            <p className={styles.subtitle}>
                                Schedule your personalized spa experience today
                            </p>
                        </div>

                        {submitSuccess ? (
                            <div className={styles.successMessage}>
                                <h3>Appointment Request Sent!</h3>
                                <p>We'll contact you shortly to confirm your booking.</p>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                                <div className={styles.formGrid}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="name" className={styles.inputLabel}>
                                            <FaUser className={styles.inputIcon} />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your full name"
                                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email" className={styles.inputLabel}>
                                            <FaEnvelope className={styles.inputIcon} />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="phone" className={styles.inputLabel}>
                                            <FaPhoneAlt className={styles.inputIcon} />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="08012345678"
                                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="service" className={styles.inputLabel}>
                                            <FaSpa className={styles.inputIcon} />
                                            Service
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            className={`${styles.select} ${errors.service ? styles.inputError : ''}`}
                                            value={formData.service}
                                            onChange={handleChange}
                                        >
                                            {services.map((service, index) => (
                                                <option key={index} value={service}>
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.service && <span className={styles.error}>{errors.service}</span>}
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="date" className={styles.inputLabel}>
                                            <FaCalendarAlt className={styles.inputIcon} />
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.date && <span className={styles.error}>{errors.date}</span>}
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="time" className={styles.inputLabel}>
                                            <FaCalendarAlt className={styles.inputIcon} />
                                            Time
                                        </label>
                                        <select
                                            id="time"
                                            name="time"
                                            className={`${styles.select} ${errors.time ? styles.inputError : ''}`}
                                            value={formData.time}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a time</option>
                                            {availableTimes.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.time && <span className={styles.error}>{errors.time}</span>}
                                    </div>
                                </div>

                                <div className={styles.textareaGroup}>
                                    <label htmlFor="message" className={styles.inputLabel}>
                                        <FaComment className={styles.inputIcon} />
                                        Special Requests
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Any special requirements or notes..."
                                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Book Appointment'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Section6;