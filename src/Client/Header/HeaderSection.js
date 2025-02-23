import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from './NavBar';
import logo from '../../Pictures/stoneHandsMoving.png'
import "./header.css"
import '../../components.css'
import Slideshow from './slideshow';

function HeaderSection( {headerHeight, scrollIntoView} ) {
  return (
    <Router>
      <div className="header-container">
        <Navbar headerHeight={headerHeight} scrollIntoView={scrollIntoView}/>
        <Slideshow />
        <div className="logo">
            <img src={logo} alt="Logo"/>     
            <button className='center-button' onClick={() => {scrollIntoView("contactSection");}}>Get a quote today</button>  
        </div>
      </div>
    </Router>
  );
}

export default HeaderSection;
