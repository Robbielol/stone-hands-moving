import React, {useRef, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import HeaderSection from './Header/HeaderSection';
import ServicesSection from './Services/servicesSection';
import ContactSection from './Contact/contactSection';
import ReviewsSection from './Reviews/reviewsSection';
import AboutSection from './About/aboutSection';
import FloatingMenu from './Header/floatingMenu';
import Footer from './Footer/footer';
import ReactGA from 'react-ga';

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY; // Replace with your tracking ID
ReactGA.initialize(TRACKING_ID);


function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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

  return (
    <div className="App">
      <Helmet>
        <title>Stonehands Moving | Best Movers In Vancouver</title>
        <link rel="icon" href="/stoneHandsMovingLogo.ico" type="image/x-icon" />
        <meta name='description' content='Want the best moving compnay in Vancouver, British Columbia? 
          We are the top rated professional movers in Vancouver. Offering residential moving services, 
          speciality item moving services and many more services to all areas in British Columbia.'/>
        <meta name='keywords' content='best moving company, Vancouver, North Vancouver, Burnaby, Surrey, Richmond, 
          Coquitlam, West Vancouver'/>

        <meta property="og:title" content="Best Professional Moving Services in Vancouver | Free Quotes" />
        <meta property="og:description" content="Hire the best moving company in Vacouver for stress-free moves. We offer top-rated residential and commercial moving services." />
        <meta property="og:image" content="https://stonehands-moving.com/Pictures/stoneHandsMovingLogo.png" />
        <meta property="og:url" content="https://stonehands-moving.com" />
        <meta property="og:type" content="stonehands-moving" />

        <meta name='viewport' content='width=700px, initial-scale=1' />
      </Helmet>
      <header ref={homeSectionRef} className="App-header">
         <HeaderSection scrollIntoView={scrollToSection}/>
      </header>
      <body>
        <section id="targetSection">
          <FloatingMenu scrollIntoView={scrollToSection}/>
        </section>
        <section ref={aboutSectionRef}>
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
  );
}

export default App;
