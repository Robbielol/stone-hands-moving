import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // CSS file for the slideshow styling
import mockPicture1 from "../../Pictures/mock-picture-5.jpg"
import mockPicture2 from "../../Pictures/RedRoomPiano.jpeg"
import mockPicture3 from "../../Pictures/SS1.jpg"
import mockPicture4 from "../../Pictures/SS3.jpg"
import mockPicture5 from "../../Pictures/SS2.jpg"

const Slideshow = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [mockPicture1, mockPicture2, mockPicture3, mockPicture4, mockPicture5]
    
    // Automatically change slide every 5 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === images.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <div className="slideshow-wrapper">
            <div className="slideshow-container">
                {/* Slides */}
                {images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <img src={image} alt={`Slide ${index}`} />
                </div>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;