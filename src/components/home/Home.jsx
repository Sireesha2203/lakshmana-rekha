// Home.js
import React from 'react';
import CardList from './CardList';
import Different from './Different';
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className='home-main'>
        <div className='branding-empty'></div>
        <span><img className='Homepage-img' src="images/Homepage.png" alt="" /></span>
        <div className="branding">
          <h2 className='branding-head text-center'>Lakshmana-rekha</h2>
          <h3 className='branding-text text-center'>Your unwavering shield of protection</h3>
        </div>
        <div className='branding-empty'></div>
      </div>

        <CardList />
        <Different />


      {/* <iframe src="tackgif.webp" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
    </div>
  );
}

export default Home;
