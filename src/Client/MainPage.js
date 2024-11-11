import React, {useRef, useEffect, useState} from 'react';
import './App.css';
import HeaderSection from './Header/HeaderSection';
import ServicesSection from './Services/servicesSection';
import ContactSection from './Contact/contactSection';
import ReviewsSection from './Reviews/reviewsSection';
import AboutSection from './About/aboutSection';
import FloatingMenu from './Header/floatingMenu';
import Footer from './Footer/footer';
import ReactGA from 'react-ga';
import WhatsAppButton from './whatsAppSection';

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY; // Replace with your tracking ID
ReactGA.initialize(TRACKING_ID);


function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [sectionHeight, setSectionHeight] = useState(0);

  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const scrollToSection = (section) => {
    const navbarHeight = document.querySelector('#navigation-bar').offsetHeight; // Get navbar height
    let sectionRef;

    if (section === 'homeSection') {
      sectionRef = homeSectionRef;
    } else if (section === 'aboutSection') {
      sectionRef = aboutSectionRef;
    } else if (section === 'servicesSection') {
      sectionRef = servicesSectionRef;
    } else if (section === 'reviewsSection') {
      sectionRef = reviewsSectionRef;
    } else if (section === 'contactSection') {
      sectionRef = contactSectionRef;
    } 

    if (sectionRef && sectionRef.current) {
      const sectionPosition = sectionRef.current.getBoundingClientRect().top; // Position relative to the viewport
      const offsetPosition = window.scrollY + sectionPosition - navbarHeight; // Adjust for navbar

      // Manually scroll to section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Get the height of the section after component mounts
    if (homeSectionRef.current) {
      setSectionHeight(homeSectionRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="App">
      <div className="content-wrapper">
      <body>
        <header ref={homeSectionRef} className="App-header">
          <HeaderSection headerHeight={sectionHeight} scrollIntoView={scrollToSection}/>
        </header>
        <WhatsAppButton />
        <section ref={aboutSectionRef}>
          <div className="middle-section">
            <FloatingMenu scrollIntoView={scrollToSection}/>
          </div>
          <AboutSection />
        </section>
        <section ref={servicesSectionRef}>
          <ServicesSection />
        </section>
        <section ref={reviewsSectionRef}>
          <ReviewsSection />
        </section>
        <section ref={contactSectionRef}>
          <ContactSection />
        </section>
        <section>
          <Footer scrollIntoView={scrollToSection}/>
        </section>
      </body>
      </div>
    </div>
  );
}

export default App;
