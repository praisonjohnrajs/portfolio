import React from 'react';

const Footer = ({ setCurrentPage }) => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-inner">
        <a href="#" className="footer-logo" onClick={handleLogoClick} style={{ textDecoration: 'none' }}>
          &lt;Praison /&gt;
        </a>
        <div className="footer-copy">© 2024 Praison John Raj S. Built with love and code.</div>
        <div className="social-links">
          <a href="mailto:praisonjohnraj.s@gmail.com" className="social-link" id="footer-email" title="Email">
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a href="https://github.com/PraisonSWDP" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-github" title="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://in.linkedin.com/in/praison-john-raj-12dec2001" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-linkedin" title="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="tel:+918428273545" className="social-link" id="footer-phone" title="Phone">
            <i className="fa-solid fa-phone"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
