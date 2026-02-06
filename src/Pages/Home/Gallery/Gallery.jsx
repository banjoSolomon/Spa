import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import styles from './Gallery.module.css';

// Import images
import facialImg from "../../../asset/facials.png";
import pedicureImg from "../../../asset/pedicure.png";
import massageImg from "../../../asset/sol.png";
import waxingImg from "../../../asset/waxme.png";
import updImg from "../../../asset/upd.png";
import massageMeImg from "../../../asset/massageMe.png";

const galleryImages = [
    { id: 1, src: facialImg, category: 'facials', title: 'Rejuvenating Facial' },
    { id: 2, src: pedicureImg, category: 'pedicure', title: 'Luxury Pedicure' },
    { id: 3, src: massageImg, category: 'massage', title: 'Therapeutic Massage' },
    { id: 4, src: waxingImg, category: 'waxing', title: 'Professional Waxing' },
    { id: 5, src: updImg, category: 'facials', title: 'Deep Cleansing Facial' },
    { id: 6, src: massageMeImg, category: 'massage', title: 'Relaxation Massage' }
];

const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'facials', label: 'Facials' },
    { id: 'massage', label: 'Massage' },
    { id: 'waxing', label: 'Waxing' },
    { id: 'pedicure', label: 'Pedicure' }
];

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredImages = selectedCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % filteredImages.length;
        setCurrentIndex(newIndex);
        setSelectedImage(filteredImages[newIndex]);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentIndex(newIndex);
        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <section className={styles.gallerySection} id="gallery">
            <div className={styles.sectionHeader}>
                <span className={styles.sectionSubtitle}>Our Work</span>
                <h2 className={styles.sectionTitle}>Gallery</h2>
                <p className={styles.sectionDescription}>
                    Explore our beautiful spa treatments and services
                </p>
            </div>

            <div className={styles.filterButtons}>
                {categories.map(category => (
                    <motion.button
                        key={category.id}
                        className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category.label}
                    </motion.button>
                ))}
            </div>

            <motion.div
                className={styles.galleryGrid}
                layout
            >
                <AnimatePresence>
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className={styles.galleryItem}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => openLightbox(image, index)}
                        >
                            <img src={image.src} alt={image.title} />
                            <div className={styles.overlay}>
                                <FaSearchPlus className={styles.zoomIcon} />
                                <h3>{image.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button className={styles.closeButton} onClick={closeLightbox}>
                            <FaTimes />
                        </button>

                        <button className={styles.navButton} style={{ left: '20px' }} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                            <FaChevronLeft />
                        </button>

                        <motion.div
                            className={styles.lightboxContent}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage.src} alt={selectedImage.title} />
                            <h3>{selectedImage.title}</h3>
                            <p>{currentIndex + 1} / {filteredImages.length}</p>
                        </motion.div>

                        <button className={styles.navButton} style={{ right: '20px' }} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                            <FaChevronRight />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
