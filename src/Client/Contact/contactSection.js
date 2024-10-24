import React, { useState } from 'react';
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import axios from 'axios';
import './contactForm.css';

const libraries = ["places"];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    workloadDescription: ''
  });
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [originAddress, setOriginAddress] = useState("");
  const [destAutocomplete, setDestAutocomplete] = useState(null);
  const [destAddress, setDestAddress] = useState("");
  const [status, setStatus] = useState('');

  const today = new Date().toISOString().split("T")[0];
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Called when the user selects an address from the autocomplete suggestions
  const onOriginPlaceSelected = () => {
    if (originAutocomplete !== null) {
      const place = originAutocomplete.getPlace();
      setOriginAddress(place.formatted_address); // You can also extract city, country, etc.
      setFormData((prevData) => ({...prevData, origin: place.formatted_address}));
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  // Called when the user selects an address from the autocomplete suggestions
  const onDestPlaceSelected = () => {
    if (destAutocomplete !== null) {
      const place = destAutocomplete.getPlace();
      setDestAddress(place.formatted_address); // You can also extract city, country, etc.
      setFormData((prevData) => ({...prevData, destination: place.formatted_address}));
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/send-email', formData);
      if (response.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ fullName: '', email: '', date: '', origin: '', destination: '', workloadDescription: '' });
        setOriginAddress('');
        setDestAddress('');
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while sending the message.');
    }
  };
  return (
    <div className='section'>
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-block">
          <p>At Stone-Hands Moving, we specialize in providing seamless, stress-free moving services across Vancouver. Our experienced, fully insured team handles both residential and commercial moves with care and efficiency.
            We offer personalized service, using modern equipment to meet your unique needs, whether it's local or long-distance. From packing to storage, our goal is to make your move as easy as possible.
            Trust Stone-Hands Moving for a smooth, reliable move every time.</p>
          <a href="tel:+1234567890">
            <button className='submit-button'>Call Us</button>
          </a>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Preferred Moving Date</label>
              <input
                  type="date"
                  id="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  required
              />
            </div>

            <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
              <Autocomplete
                onLoad={(autocompleteInstance) => setOriginAutocomplete(autocompleteInstance)}
                onPlaceChanged={onOriginPlaceSelected}
              >
                <div className="form-group">
                  <label htmlFor="from">Move From Location</label>
                  <input
                      type="text"
                      id="moveFrom"
                      name="moveFrom"
                      placeholder="Enter the starting address"
                      value={originAddress}
                      onChange={(e) => setOriginAddress(e.target.value)}
                      required
                  />
                </div>
              </Autocomplete>

              <Autocomplete
                onLoad={(autocompleteInstance) => setDestAutocomplete(autocompleteInstance)}
                onPlaceChanged={onDestPlaceSelected}
              >
                <div className="form-group">
                  <label htmlFor="to">Move To Location</label>
                  <input
                      type="text"
                      id="moveTo"
                      name="moveTo"
                      placeholder="Enter the destination address"
                      value={destAddress}
                      onChange={(e) => setDestAddress(e.target.value)}
                      required
                  />
                </div>
              </Autocomplete>
            </LoadScript>

            <div className="form-group">
              <label htmlFor="workloadDescription">Workload Description</label>
              <textarea
                  id="workloadDescription"
                  name="workloadDescription"
                  rows="5"
                  value={formData.workloadDescription}
                  onChange={handleChange}
                  placeholder="Describe the size of the move, special requirements, etc."
                  required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
            <p className='email-message'>{status}</p>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;