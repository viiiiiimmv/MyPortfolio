import React, { useEffect, useState } from 'react';
import '../assets/css/ProjectPreview.css';
import DOMPurify from 'dompurify';

export default function ProjectPreview({ project }) {
    const { name, description, details, images = [], links = [] } = project || {};
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [images]);

    if (!project) return null;

    return (
        <div className="project-preview">
            <h2 className="title">{name}</h2>
            <p className="description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}></p>

            <div className="image-container">
                {images.length > 0 && (
                    <div className="carousel">
                        <img
                            src={images[currentIndex]}
                            alt={`${name} screenshot ${currentIndex + 1}`}
                            className="carousel-image"
                        />
                        <div className="carousel-dots">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {links.length > 0 && (
                <div className="links">
                    {links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.text}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
