import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Pictures/stoneHandsMovingLogo.png'
import SocialMediaLinks from '../../socialMedia';
import MenuOptions from '../../menuOptions';

const Navbar = ({scrollIntoView}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const lastScrollY = useRef(0); // To store the last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const menu = menuRef.current;
      
      // When scrolling down, show the menu if it's within 70px from the top NEEDS TO BE CHANGED TO DYNAMIC VALUE
      if (currentScrollY > 600) {
        setIsVisible(true);
      } 
      // When scrolling up, hide the menu again
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(false);
      }

      // Update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle the menu when button is clicked
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav id="navigation-bar" className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt='stone-hands-moving-logo' /></Link>
      </div>
      <div ref={menuRef} className={`sticky-menu ${isVisible ? 'visible' : ''}`}>
        <MenuOptions scrollIntoView={scrollIntoView} />
      </div>
      <SocialMediaLinks />
      {/* Hamburger icon or button to trigger the pop-out menu for mobile*/}
      <button className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        &#9776;
      </button>
       {/* Pop-out menu container for mobile*/}
       <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => {scrollIntoView("homeSection"); toggleMenu();}}><a href="#home">Home</a></li>
          <li onClick={() => {scrollIntoView("aboutSection"); toggleMenu();}}><a href="#about">About</a></li>
          <li onClick={() => {scrollIntoView("servicesSection"); toggleMenu();}}><a href="#services">Services</a></li>
          <li onClick={() => {scrollIntoView("reviewsSection"); toggleMenu();}}><a href="#reviews">Reviews</a></li>
          <li onClick={() => {scrollIntoView("contactSection"); toggleMenu();}}><a href="#contact">Contact</a></li>
        </ul>
        <SocialMediaLinks/>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;