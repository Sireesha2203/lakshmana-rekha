import React from 'react'
import "./Home.css"

function Home() {
  return (
    <div className="home">
      <div className='home-main'>
          <div className='branding-empty'></div>
        <span><img className='Homepage-img ' src="images/Homepage.png" alt="" /></span>
        <div className="branding">
          <h2 className='branding-head text-center'>Lakshmana-rekha</h2>
          <h3 className='branding-text text-center'>Your unwavering shield of protection</h3>
        </div>
          <div className='branding-empty'></div>
      </div>
     

      <div className="features">
        <div className="branch">
          <div className="feature">
            <div className="feature-icon">🌟</div>
            <div className="feature-title">Feature 1</div>
            <div className="feature-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
        </div>
        <div className="branch">
          <div className="feature">
            <div className="feature-icon">🚀</div>
            <div className="feature-title">Feature 2</div>
            <div className="feature-description">Suspendisse potenti. Nulla eget libero hendrerit, euismod velit.</div>
          </div>
        </div>
        <div className="branch">
          <div className="feature">
            <div className="feature-icon">🎨</div>
            <div className="feature-title">Feature 3</div>
            <div className="feature-description">Vivamus pretium, urna at mattis scelerisque, libero eros.</div>
          </div>
        </div>
        <div className="branch">
          <div className="feature">
            <div className="feature-icon">📱</div>
            <div className="feature-title">Feature 4</div>
            <div className="feature-description">Praesent tincidunt odio et massa egestas, id congue tortor.</div>
          </div>
        </div>
      </div>

      {/* <iframe src="tackgif.webp" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>  */}
    </div>
  );
}


export default Home;