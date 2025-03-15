import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './components.css'; // You can create this file for styling

const SocialMediaLinks = () => {
  return (
    <div className="social-media-links">
      <a href="https://www.instagram.com/stonehandsmoving/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="3x" className="social-icon" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="3x" className="social-icon" />
      </a>
      {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon" />
      </a> */}
      
      {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" className="social-icon" />
      </a> */}
    </div>
  );
};

export default SocialMediaLinks;