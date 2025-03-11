import React, { useState, useEffect, useRef } from 'react';
import './floatingMenu.css';
import MenuOptions from '../../menuOptions';

const FloatingMenu = ({scrollIntoView}) => {
    const [isHidden, setIsHidden] = useState(false);
    const menuRef = useRef(null);
    const lastScrollY = useRef(0); // To store the last scroll position

    useEffect(() => {
      if(typeof window === 'undefined') return;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const menu = menuRef.current;
        const menuPosition = menu.getBoundingClientRect().top;
        
        // When scrolling down, hide the menu if it's within 70px from the top
        if (currentScrollY > lastScrollY.current && menuPosition <= 70) {
          setIsHidden(true);
        } 
        // When scrolling up, show the menu again
        else if (currentScrollY < lastScrollY.current) {
          setIsHidden(false);
        }
  
        // Update the last scroll position
        lastScrollY.current = currentScrollY;
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div ref={menuRef} className={`floating-menu ${isHidden ? 'hidden' : ''}`}>
        <MenuOptions scrollIntoView = {scrollIntoView}/>
    </div>
  );
};

export default FloatingMenu;