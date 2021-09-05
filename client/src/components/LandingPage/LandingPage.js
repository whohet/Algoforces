import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Illustration from '../../assets/landingPageIllustration.png';

import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <Container>
        <div className="landing-left">
          <div className="landing-left-box">
            <div className="landing-title">
              Algoforces <span className="landing-title-light">- Online Judge</span>
            </div>
            <div className="landing-description">Best platform to solve programming problems.</div>
            <div className="landing-get-started">
              <Link to={{ pathname: '/login', state: { method: 'signup' } }}>
                <button>Get Started</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="landing-right">
          <div className="landing-illustration-container">
            <img src={Illustration} alt="illustration" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
