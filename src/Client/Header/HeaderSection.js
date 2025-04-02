import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import logo from '../../Pictures/stoneHandsMoving.png'
import Slideshow from './slideshow';

const HeaderSection = ({scrollIntoView}) => {
  return (
    <Router>
      <div className="header-container">
        <Slideshow />
        <div className="logo">
            <img src={logo.src} alt="Logo"/>     
            <button className='center-button' onClick={() => {scrollIntoView("contactSection");}}>Get a quote today</button>  
        </div>
      </div>
    </Router>
  );
}

export default HeaderSection;
