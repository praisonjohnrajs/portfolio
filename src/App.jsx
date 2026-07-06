import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';

// Pages
import Home from './pages/Home';
import Story from './pages/Story';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showBackTop, setShowBackTop] = useState(false);

  // Back to Top button scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'story':
        return <Story />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      {/* Interactive Background */}
      <ParticleBackground />

      {/* Glowing background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Navigation bar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Dynamic Page Content */}
      <main>
        {renderPage()}
      </main>

      {/* Floating AI Chat Assistant */}
      <AIChatWidget />

      {/* Floating WhatsApp Action Link */}
      <a 
        href="https://wa.me/918428273545?text=Hi%20Praison,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20for%20a%20development%20project%20or%20job!" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float-btn"
        title="Chat with Praison on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Back to Top Button */}
      <button 
        className={`back-top ${showBackTop ? 'visible' : ''}`} 
        id="backTop" 
        onClick={scrollToTop}
        title="Back to top"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}

export default App;
