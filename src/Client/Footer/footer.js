import './footer.css'; 
import logo from '../../Pictures/logo-trans.png'
import SocialMediaLinks from '../../socialMedia';


const Footer = ({scrollIntoView}) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Logo */}
        <div className="footer-logo">
          <img src={logo.src} alt="Company Logo" />
        </div>

        {/* Footer Menu */}
        <div className="footer-menu">
            <h3>Navigate</h3>
            <ul>
              <li onClick={() => {scrollIntoView("homeSection");}}><a href="#home">Home</a></li>
              <li onClick={() => {scrollIntoView("aboutSection");}}><a href="#about">About</a></li>
              <li onClick={() => {scrollIntoView("servicesSection");}}><a href="#services">Services</a></li>
              <li onClick={() => {scrollIntoView("reviewsSection");}}><a href="#reviews">Reviews</a></li>
              <li onClick={() => {scrollIntoView("contactSection");}}><a href="#contact">Contact</a></li>
            </ul>
        </div>

        {/* Hours of Operation */}
        <div className="footer-hours">
            <h3>Hours of Operation</h3>
            <p>Monday to Sunday: 6 AM - 9 PM</p>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Contact Information</h3>
          <p>Phone: +1 (604) 828-4860</p>
          <p>Email: sales@stonehandsmoving.com</p>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;