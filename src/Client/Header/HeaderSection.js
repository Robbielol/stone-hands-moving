import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import logo from '../../Pictures/stoneHandsMoving.png'
import "./header.css"
import '../../components.css'
import Slideshow from './slideshow';

function HeaderSection( {scrollIntoView} ) {
  return (
    <Router>
      <div>
        <Navbar scrollIntoView={scrollIntoView}/>
        <Slideshow />
        <div className="logo">
            <img src={logo} alt="Logo"/>     
        </div>
        <button className='center-button' onClick={() => {scrollIntoView("contactSection");}}>Get A Quote Today</button>
      </div>
    </Router>
  );
}

export default HeaderSection;
