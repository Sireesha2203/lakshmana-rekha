import React from 'react'
import {Outlet} from 'react-router-dom';
import Navi from './navigationbar/Navi';
import Footer from './footer/Footer';

function RouteLayout() {

  return (
    <div>
      <Navi/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RouteLayout;
