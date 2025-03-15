import { FaWhatsapp } from 'react-icons/fa';
import './whatsAppButton.css'; // Optional: style your button with custom CSS

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/16048284860" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={30} alt="WhatsApp"/>
    </a>
  );
};

export default WhatsAppButton;