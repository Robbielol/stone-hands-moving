import React, { useState, useEffect } from 'react';
// import { LoadScript, Autocomplete } from "@react-google-maps/api";
import axios from 'axios';
import './contactForm.css';

//const libraries = ["places"];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    email: '',
    date: '',
    workloadDescription: ''
  });
 // const [originAutocomplete, setOriginAutocomplete] = useState(null);
  //const [originAddress, setOriginAddress] = useState("");
  //const [destAutocomplete, setDestAutocomplete] = useState(null);
  //const [destAddress, setDestAddress] = useState("");
  const [status, setStatus] = useState('');
  const [today, setToday] = useState('');
  
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Called when the user selects an address from the autocomplete suggestions
  // const onOriginPlaceSelected = () => {
  //   if (originAutocomplete !== null) {
  //     const place = originAutocomplete.getPlace();
  //     setOriginAddress(place.formatted_address); // You can also extract city, country, etc.
  //     setFormData((prevData) => ({...prevData, origin: place.formatted_address}));
  //   } else {
  //     console.log("Autocomplete is not loaded yet!");
  //   }
  // };

  // Called when the user selects an address from the autocomplete suggestions
  // const onDestPlaceSelected = () => {
  //   if (destAutocomplete !== null) {
  //     const place = destAutocomplete.getPlace();
  //     setDestAddress(place.formatted_address); // You can also extract city, country, etc.
  //     setFormData((prevData) => ({...prevData, destination: place.formatted_address}));
  //   } else {
  //     console.log("Autocomplete is not loaded yet!");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/send-email', formData);
      if (response.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ fullName: '', name: '', email: '', date: '', origin: '', destination: '', workloadDescription: '' });
        // setOriginAddress('');
        // setDestAddress('');
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
              Trust Stonehands Moving for a smooth, reliable move every time.
          </p>
          <a href="tel:+16048284860">
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
                  placeholder='Enter first and last name'
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Phone Number</label>
              <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  placeholder='Enter in phone number'
                  pattern='[0-9]{10}'
                  onChange={handleChange}
                  title="Enter a 10-digit phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter in email address'
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

            {/* <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
              <Autocomplete
                onLoad={(autocompleteInstance) => setOriginAutocomplete(autocompleteInstance)}
                onPlaceChanged={onOriginPlaceSelected}
              > */}
                <div className="form-group">
                  <label htmlFor="from">Move From Location</label>
                  <input
                      type="text"
                      id="moveFrom"
                      name="moveFrom"
                      placeholder="Enter the starting address"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                  />
                </div>
              {/* </Autocomplete> */}

              {/* <Autocomplete
                onLoad={(autocompleteInstance) => setDestAutocomplete(autocompleteInstance)}
                onPlaceChanged={onDestPlaceSelected}
              > */}
                <div className="form-group">
                  <label htmlFor="to">Move To Location</label>
                  <input
                      type="text"
                      id="moveTo"
                      name="moveTo"
                      placeholder="Enter the destination address"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                  />
                </div>
              {/* </Autocomplete>
            </LoadScript> */}

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