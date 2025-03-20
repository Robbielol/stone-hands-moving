import React, {useRef, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import './App.css';
import './Header/Navbar.css'
import WhatsAppButton from './whatsAppSection'
import ServicesSection from './Services/servicesSection';
import ReviewsSection from './Reviews/reviewsSection';
import AboutSection from './About/aboutSection';
import ReactGA from 'react-ga';

const TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY; // Replace with your tracking ID
const FloatingMenu = dynamic(() => import('./Header/floatingMenu'), { ssr: false });
const Navbar = dynamic(() => import('./Header/NavBar'), {ssr: false });
const HeaderSection = dynamic(() => import('./Header/HeaderSection'), { ssr: false });
const ContactSection = dynamic(() => import('./Contact/contactSection'), { ssr: false });
const Footer = dynamic(() => import('./Footer/footer'), { ssr: false });

function App() {
  const [sectionHeight, setSectionHeight] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const navbarRef = useRef(null);
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    if (TRACKING_ID) {
      ReactGA.initialize(TRACKING_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  const scrollToSection = (section) => {
    if(!isClient) return; //Ensures client is running so no SSR errors
    console.log('here', section)
    let sectionRef;
    if (section === 'homeSection')  sectionRef = homeSectionRef;
    else if (section === 'aboutSection') sectionRef = aboutSectionRef; 
    else if (section === 'servicesSection') sectionRef = servicesSectionRef; 
    else if (section === 'reviewsSection') sectionRef = reviewsSectionRef; 
    else if (section === 'contactSection') sectionRef = contactSectionRef; 
        
    if (sectionRef?.current) {
       // Get navbar height
      const sectionPosition = sectionRef.current.getBoundingClientRect().top; // Position relative to the viewport
      const offsetPosition = window.scrollY + sectionPosition - navbarRef.current.offsetHeight; // Adjust for navbar

      // Manually scroll to section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  //Get the height of the section after component mounts
  useEffect(() => {
    if (!navbarRef.current || !homeSectionRef.current) return; // Ensure ref is not null before running
    
    setSectionHeight(homeSectionRef?.current.offsetHeight - navbarRef?.current.offsetHeight);
  }, []);
  
  return (
    <div className="App">
      <div className="content-wrapper">
        <div ref={navbarRef} className="navbar-wrapper">
          <Navbar headerHeight={sectionHeight} scrollIntoView={scrollToSection}/>
        </div>
        <header ref={homeSectionRef} className="App-header">
          <HeaderSection scrollIntoView={scrollToSection}/>
        </header>
        <article>
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
        </article>
      </div>
    </div>
  );
}

export default App;
