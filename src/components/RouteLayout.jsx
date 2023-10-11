import React from 'react'
import {Outlet} from 'react-router-dom';
import Navi from './navigationbar/Navi';
import Footer from './footer/Footer';
import './RouteLayout.css';

function RouteLayout() {
  
  return (
    <div>
      <div className="navi-div">
        <Navi/>
      </div>
      <div className="outlet-div mt-1">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default RouteLayout;
