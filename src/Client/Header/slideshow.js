import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // CSS file for the slideshow styling
import mainSlidePicture from "../../Pictures/mock-picture-5.jpg"
import mainSlidePicture2 from "../../Pictures/RedRoomPiano.jpeg"
import mainSlidePicture3 from "../../Pictures/backOfTruck.jpeg"
import mainSlidePicture4 from "../../Pictures/backOfGarage.jpeg"
import mainSlidePicture5 from "../../Pictures/pianoMan.jpeg"
import phoneSlidePicture1 from "../../Pictures/pianoPhone.jpeg"
import phoneSlidePicture2 from "../../Pictures/redRoomPhone.jpeg"
import phoneSlidePicture3 from "../../Pictures/storagePhone.jpeg"
import phoneSlidePicture4 from "../../Pictures/tablephone.jpeg"

const Slideshow = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageSrc, setImageSrc] = useState([]);

    useEffect(() => {
        if(typeof window === 'undefined') return;
        
        // Function to update the image source based on window width
        const updateImageSrc = () => {
          if (window.innerWidth > 768) {
            setImageSrc([mainSlidePicture.src, mainSlidePicture2.src, mainSlidePicture3.src, mainSlidePicture4.src, mainSlidePicture5.src]); // Directory for larger screens
          } else {
            setImageSrc([phoneSlidePicture1.src, phoneSlidePicture2.src, phoneSlidePicture3.src, phoneSlidePicture4.src]); // Directory for smaller screens
          }
        };
        // Initial call to set image source
        updateImageSrc();
    
        // Add event listener for window resize
        window.addEventListener('resize', updateImageSrc);
    
        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', updateImageSrc);
      }, []);
    
    // Automatically change slide every 5 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === imageSrc.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }, [imageSrc.length]);

    return (
        <>
            <div className="slideshow-wrapper">
                <div className="slideshow-container">
                    {/* Slides */}
                    {imageSrc.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                    ))}
                </div>
            </div>
            <div className="phone-slideshow-wrapper">
                <div className="slideshow-container">
                        <img src={mainSlidePicture2} alt={`Slide ${2}`} />
                </div>
            </div>
        </>
    );
};

export default Slideshow;