import React, { useState, useEffect } from 'react'
import Image from 'next/image'
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
        const updateImageSrc = () => {
            if (window.innerWidth > 768) {
                setImageSrc([mainSlidePicture, mainSlidePicture2, mainSlidePicture3, mainSlidePicture4, mainSlidePicture5]);
            } else {
                setImageSrc([phoneSlidePicture1, phoneSlidePicture2, phoneSlidePicture3, phoneSlidePicture4]);
            }
        };
        
        updateImageSrc();
        window.addEventListener('resize', updateImageSrc);
        return () => window.removeEventListener('resize', updateImageSrc);
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === imageSrc.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [imageSrc.length]);

    return (
        <div className="slideshow-wrapper">
            <div className="slideshow-container">
                {imageSrc.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <div className="image-container">
                            <Image
                                src={image}
                                alt={`Slide ${index}`}
                                fill
                                quality={85}
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, 90vw"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}

                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;